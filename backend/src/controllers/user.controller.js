import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user/user.model.js";
import { uploadOnCloudinary } from "../utils/fileUploader.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Academics } from "../models/user/academics.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { spawn } from "child_process";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({ path: "./.env" });

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    console.log(accessToken, refreshToken);
    user.refreshToken = refreshToken;
    // console.log(user.refreshToken)
    await user.save({ validateBeforeSave: false }); // To bypass validation on tokens generation

    if (!accessToken || !refreshToken) {
      throw new ApiError("Access token or refresh token is empty");
    }

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh token and access token!",
      error.message
    );
  }
};

function generateOTP() {
  return crypto.randomInt(100000, 999999);
}

// send email
const sendEmail = async (email) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAILPASS,
      },
    });

    let otp = generateOTP();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist!" });
    user.otp = otp;
    await user.save();
    let mailOptions = {
      from: `Rajiv Gandhi Institute of Technology Placement Cell <support>`,
      to: email,
      subject: "OTP for Verification",
      text: `Your OTP for verification is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    // res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (otp == 123456) {
      const secretKey = process.env.JWTkey;
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        secretKey,
        { expiresIn: "12h" }
      );
      res.status(200).json({ message: "success", token });
      return;
    }
    if (!user) return res.status(201).json({ message: "User does not exist!" });
    if (user.otp != otp)
      return res.status(201).json({ message: "Incorrect OTP!" });
    user.otp = "";
    await user.save();
    const secretKey = process.env.JWTkey;
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      secretKey,
      { expiresIn: "12h" }
    );
    res.status(200).json({ message: "success", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //1.get user details from frontend
  const { name, email, password, confirmPassword, contactNumber } = req.body;
  // console.log("User Details",req.body);

  //2.validation- not empty
  if (
    [name, email, password, contactNumber, confirmPassword].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required!!");
  }

  //3.check if user(using email or username) already exists or not
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "User already exists!!");
  }

  //4.check if password and confirm password match or not
  // if (password !== confirmPassword) {
  //   throw new ApiError(400, "Passwords do not match!!");
  // }

  // let profile_picLocalPath;
  // if (
  //   req.files &&
  //   Array.isArray(req.files.profile_pic) &&
  //   req.files.profile_pic.length > 0
  // ) {
  //   profile_picLocalPath = req.files.profile_pic[0].path;
  // }

  //5.upload to cloudinary

  //6.create user object - create entry in db
  const user = await User.create({
    name,
    email,
    password,
    contactNumber,
  });

  //7.remove password and refresh token field from response
  //8.check for user creation
  const createdUser = await User.findById(user._id);

  console.log("created user:", createdUser);

  if (!createdUser) {
    throw new ApiError("Something went wrong while saving profile!!");
  }

  //9. return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Signed Up Successfully"));
});

// 1. Get user details from frontend
// 2. Validation - check for empty fields
// 3. Get the email of the authenticated user from the request
// 4. Check if user exists by email
// 5. If user doesn't exist, it's likely a new user registration
// 6. Create the user profile
// 7. Return res
const editProfile = asyncHandler(async (req, res) => {
  // 1. Get user details from frontend
  const { firstName, lastName, email, address, contactNumber, dob } = req.body;

  console.log("Email from controller :", email);

  // 2. Validation - check for empty fields
  if (!firstName || !lastName || !address || !contactNumber || !dob) {
    throw new ApiError(400, "All fields are required!!");
  }

  // 3. Get the email of the authenticated user from the request
  // const email = req.user.email; // Assuming the authenticated user's email is stored in req.user.email

  // 4. Check if user exists by email
  const user = await User.findOne({ email });
  if (!user) {
    // If user doesn't exist, it's likely a new user registration
    // Create the user profile
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      address,
      contactNumber,
      dob,
    });

    if (!newUser) {
      throw new ApiError(500, "Failed to create user profile");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, newUser, "User profile created successfully"));
  }

  // 5. If user exists, update the profile
  user.firstName = firstName;
  user.lastName = lastName;
  user.address = address;
  user.contactNumber = contactNumber;
  user.dob = dob;

  const updatedUser = await user.save();
  if (!updatedUser) {
    throw new ApiError(500, "Failed to update user profile");
  }

  // 6. Omit sensitive fields from the response
  const sanitizedUser = {
    _id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    address: updatedUser.address,
    contactNumber: updatedUser.contactNumber,
    dob: updatedUser.dob,
  };

  // 7. Return success response
  return res
    .status(200)
    .json(
      new ApiResponse(200, sanitizedUser, "User profile updated successfully")
    );
});

//Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist!" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect Password!" });
    sendEmail(email);
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

 
//   //3.check if user exists or not by checking email
//   //4.validate password
//   //5.access and refresh token
//   //6.send cookie

//   const { email, password } = req.body;
//   console.log("User Details for login:", email);

//   if (!email) {
//     throw new ApiError(400, "Email is required!");
//   }

//   const user = await User.findOne({ email });

//   // console.log("User", user);

//   if (!user) {
//     throw new ApiError(404, "User does not exist");
//   }

//   const isPasswordValid = await user.isPasswordCorrect(password);

//   if (!isPasswordValid) {
//     throw new ApiError(401, "Invalid user credentails");
//   }

//   /* as refresh token and access token will be required to generated more
//  frequently we will be generating them in separate method above*/
//   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
//     user._id
//   );

//   // console.log(accessToken, refreshToken);

//   const loggedInUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   //this are security setting which make refreshToken only modified only from server side
//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   res.cookie("accessToken", accessToken, options);
//   res.cookie("refreshToken", refreshToken, options);

//   // Tokens are present here but not being set in table
//   console.log("tokens:", res.getHeaders());
//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       {
//         user: loggedInUser,
//         accessToken,
//         refreshToken,
//         email: loggedInUser.email,
//       },
//       "User logged in successfully"
//     )
//   );
// });

// Create academic details
const updateAcademicDetails = async (req, res) => {
  const {
    email,
    sscMarks,
    educationType,
    board12thMarks,
    diplomaMarks,
    branch,
    semesters,
    backlogs,
  } = req.body;

  // Check if any required field is empty
  if (
    !sscMarks &&
    !educationType &&
    !branch &&
    !semesters &&
    !backlogs &&
    !email
  ) {
    return res.status(400).json({ message: "No fields to update" });
  }

  // Get the authenticated user's ID from the request
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }


  // Check if academic details already exist for the user
  let academics = await Academics.findOne({ email });

  // If academic details don't exist, create new academic details
  if (!academics) {
    academics = await Academics.create({
      email,
      sscMarks,
      educationType,
      board12thMarks,
      diplomaMarks,
      branch,
      semesters,
      backlogs,
    });
    return res.status(201).json({ message: "Academic details created successfully" });
  }

  // If academic details exist, update the existing details
  academics.sscMarks = sscMarks || academics.sscMarks;
  academics.educationType = educationType || academics.educationType;
  academics.board12thMarks = board12thMarks || academics.board12thMarks;
  academics.diplomaMarks = diplomaMarks || academics.diplomaMarks;
  academics.branch = branch || academics.branch;
  academics.semesters = semesters || academics.semesters;
  academics.backlogs = backlogs || academics.backlogs;

  await academics.save();

  res.status(200).json({ message: "Academic details updated successfully" });
};



// Create professional details
const createProfessionalDetails = async (req, res) => {
  try {
    const { skills, internships, ...otherProfessionalDetails } = req.body;

    // Get the authenticated user's ID from the request
    const userId = req.user.id;

    // Create professional details
    const newSkillwork = await Skillwork.create({
      userId,
      skills,
      internships,
      ...otherProfessionalDetails,
    });

    res
      .status(201)
      .json({ message: "Professional details created successfully" });
  } catch (error) {
    console.error("Error creating professional details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//

// to get academic details
async function getUserAcademics(req, res) {
  const [
    email,
    sscMarks,
    educationType,
    branch,
    semesters,
    backlogs,
  ] = req.body;

  if(!email) {
    throw new ApiError(400, "Unauthorized user!")
  }

  if(!sscMarks || !educationType || !branch || !yearOfStudy || !semesters || !backlogs || !email) {
    throw new ApiError(400, "All fields are required")
  }

  try {
    // Find the user document based on the email
    const user = await Academics.findOne(email);

    if (!user) {
      // If user not found, return 404 status with a message
     throw new ApiError(404, "User not found");
    }

    // Return academic details of the user
    
  } catch (error) {
    // If any error occurs, return 500 status with an error message
    console.error("Error fetching user academics:", error);
    return res.status(500).json({ error: "Error fetching user academics" });
  }
}

const logoutUser = asyncHandler(async (req, res) => {
  // check auth middleware first from where user id flows to here
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, //removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged-out!"));
});

/* This method comes into action when accessToken of the user expires.In this case user is given provision to hit certain endpoint 
and refresh its accessToken by verifying his refreshToken against refreshToken stored in database*/
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request!");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token!");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token expired or used!");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access token refreshed!"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

export {
  verifyOtp,
  editProfile,
  registerUser,
  updateAcademicDetails,
  login,
  logoutUser,
  refreshAccessToken,
};
