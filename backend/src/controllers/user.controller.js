import { asyncHandler } from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user/user.model.js";
import { uploadOnCloudinary } from "../utils/fileUploader.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Academics } from "../models/user/academics.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log("User1:", user);
    if (!user || !user.isActive)
      throw new ApiError("User not found or is inactive", 401);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    console.log("Access:", accessToken);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // To bypass validation on tokens generation

    if (!accessToken || !refreshToken) {
      console.log("Error generating tokens:", error); // Error object is not defined here
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


const registerUser = asyncHandler(async (req, res) => {
  //1.get user details from frontend
  const {
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

const loginUser = asyncHandler(async (req, res) => {
  //1.ask for email and password
  //2.check if fields are empty or not
  //3.check if user exists or not by checking email
  //4.validate password
  //5.access and refresh token
  //6.send cookie

  const { email, password } = req.body;
  console.log("User Details for login:", email);

  if (!email) {
    throw new ApiError(400, "Email is required!");
  }

  const user = await User.findOne({ email });

  // console.log("User", user);

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentails");
  }

  /* as refresh token and access token will be required to generated more
 frequently we will be generating them in separate method above*/
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // console.log(accessToken, refreshToken);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //this are security setting which make refreshToken only modified only from server side
  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);

  // Tokens are present here but not being set in table
  console.log("tokens:", res.getHeaders());
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        accessToken,
        refreshToken,
      },
      "User logged in successfully"
    )
  );
});

// Create academic details
const createAcademicDetails = async (req, res) => {
  try {
    const {
      userId,
      sscMarks,
      sscSchoolName,
      sscYearOfPassing,
      hscMarks,
      hscCollegeName,
      hscYearOfPassing,
      diplomaMarks,
      diplomaCollegeName,
      diplomaYearOfPassing,
      degreeCollegeName,
      degreeBranch,
      degreeYearOfStudy,
      semesterGPAs,
      backlog,
    } = req.body;

    // Get the authenticated user's ID from the request
    userId = req.user._id;

    // Create academic details
    // Create academic details
    const newAcademics = await Academics.create({
      userId,
      ssc: {
        marks: sscMarks,
        school_name: sscSchoolName,
        year_of_passing: sscYearOfPassing,
      },
      hsc: {
        marks: hscMarks,
        college_name: hscCollegeName,
        year_of_passing: hscYearOfPassing,
      },
      diploma: {
        marks: diplomaMarks,
        college_name: diplomaCollegeName,
        year_of_passing: diplomaYearOfPassing,
      },
      degree: {
        college_name: degreeCollegeName,
        branch: degreeBranch,
        year_of_study: degreeYearOfStudy,
        semester_gpas: semesterGPAs,
        backlog,
      },
    });

    res.status(201).json({ message: "Academic details created successfully" });
  } catch (error) {
    console.error("Error creating academic details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  createAcademicDetails,
};
