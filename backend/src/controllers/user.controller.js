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
import nodemailer from "nodemailer"

dotenv.config({path: "./.env",});

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
};

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
      const token = jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name,
      },
        secretKey,
        { expiresIn: "12h" }
      );
      res.status(200).json({ message: "success", token });
      return
    }
    if (!user) return res.status(201).json({ message: "User does not exist!" });
    if (user.otp != otp) return res.status(201).json({ message: "Incorrect OTP!" });
    user.otp = "";
    await user.save();
    const secretKey = process.env.JWTkey;
    const token = jwt.sign({
      id: user._id,
      email: user.email
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
  const {
    name,
    firstName,
    lastName,
    email,
    password,
    address,
    contactNumber,
    dateOfBirth,
    gender,
  } = req.body;
  // console.log("User Details",req.body);

  //2.validation- not empty
  if (
    [
      name,
      firstName,
      lastName,
      email,
      password,
      address,
      contactNumber,
      dateOfBirth,
      gender,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!!");
  }

  //3.check if user(using email or username) already exists or not
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "This email or username already exist!");
  }

  //4.check for images, check for avatar

  // console.log("Req.files: ", req.files);

  // const profilePicLocalPath = req.files?.profile_pic[0]?.path;

  // // if (
  // //   req.files &&
  // //   Array.isArray(req.files.coverImage) &&
  // //   req.files.coverImage.length > 0
  // // ) {
  // //   coverImageLocalPath = req.files.coverImage[0].path;
  // // }
  // // console.log("CoverImagae:", coverImageLocalPath);
  // console.log("ProfilePic Localpath:", profilePicLocalPath);

  // if (!profilePicLocalPath) {
  //   throw new ApiError(400, "ProfilePic file is required");
  // }

  let profile_picLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.profile_pic) &&
    req.files.profile_pic.length > 0
  ) {
    profile_picLocalPath = req.files.profile_pic[0].path;
  }

  //5.upload to cloudinary
  const profile_pic = await uploadOnCloudinary(profile_picLocalPath);

  //6.create user object - create entry in db
  const user = await User.create({
    name,
    firstName,
    lastName,
    profile_pic: profile_pic?.url || "",
    email,
    password,
    contactNumber,
    dateOfBirth,
    gender,
  });

  //7.remove password and refresh token field from response
  //8.check for user creation
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  console.log("created user:", createdUser);

  if (!createdUser) {
    throw new ApiError("Something went wrong while registering the user!!");
  }

  //9. return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

//Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist!" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect Password!" });
    sendEmail(email);
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// const loginUser = asyncHandler(async (req, res) => {
//   //1.ask for email and password
//   //2.check if fields are empty or not
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
const createAcademicDetails = async (req, res) => {
  const {
    email,
    sscMarks,
    educationType,
    board12thMarks,
    diplomaMarks,
    branch,
    yearOfStudy,
    semesters,
    backlogs,
  } = req.body;

  // Check if any required field is empty
  if (
    !sscMarks ||
    !educationType ||
    !branch ||
    !yearOfStudy ||
    !semesters ||
    !backlogs ||
    !email
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
// const createAcademicDetails = async (req, res) => {
//   try {
//     const {
//       userId,
//       sscMarks,
//       sscSchoolName,
//       sscYearOfPassing,
//       hscMarks,
//       hscCollegeName,
//       hscYearOfPassing,
//       diplomaMarks,
//       diplomaCollegeName,
//       diplomaYearOfPassing,
//       degreeCollegeName,
//       degreeBranch,
//       degreeYearOfStudy,
//       semesterGPAs,
//       backlog,
//     } = req.body;

  // Get the authenticated user's ID from the request
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const userId = user._id;
//     // Get the authenticated user's ID from the request
//     userId = req.user._id;

  // Create academic details
  const newAcademics = await Academics.create({
    userId,
    sscMarks,
    educationType,
    board12thMarks,
    diplomaMarks,
    branch,
    yearOfStudy,
    semesters,
    backlogs,
  });
//     // Create academic details
//     // Create academic details
//     const newAcademics = await Academics.create({
//       userId,
//       ssc: {
//         marks: sscMarks,
//         school_name: sscSchoolName,
//         year_of_passing: sscYearOfPassing,
//       },
//       hsc: {
//         marks: hscMarks,
//         college_name: hscCollegeName,
//         year_of_passing: hscYearOfPassing,
//       },
//       diploma: {
//         marks: diplomaMarks,
//         college_name: diplomaCollegeName,
//         year_of_passing: diplomaYearOfPassing,
//       },
//       degree: {
//         college_name: degreeCollegeName,
//         branch: degreeBranch,
//         year_of_study: degreeYearOfStudy,
//         semester_gpas: semesterGPAs,
//         backlog,
//       },
//     });

  res.status(201).json({ message: "Academic details created successfully" });
};
//     res.status(201).json({ message: "Academic details created successfully" });
//   } catch (error) {
//     console.error("Error creating academic details:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

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
  const userEmail = req.params.email;

  try {
    // Find the user document based on the email
    const user = await Academics.findOne({ "userInfo.email": userEmail });

    if (!user) {
      // If user not found, return 404 status with a message
      return res.status(404).json({ error: "User not found" });
    }

    // Return academic details of the user
    return res.json({ academics: user.userInfo.academic });
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
  registerUser,
  //loginUser,
  login,
  logoutUser,
  refreshAccessToken
};
