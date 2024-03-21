import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/fileUploader.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // To bypass validation on tokens generation

    if (!accessToken || !refreshToken) {
      throw new ApiError("Access token or refresh token is empty");
    }

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh token and access token!"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //1.get user details from frontend
  const { fullname, email, username, password } = req.body;
  // console.log("User Details",req.body);

  //2.validation- not empty
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!!");
  }

  // var regexp =
  //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // if (!regexp.test(String(email).toLowerCase())) {
  //   throw new ApiError(400, "Invalid Email!!");
  // }

  //3.check if user(using email or username) already exists or not
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "This email or username already exist!");
  }

  //4.check for images, check for avatar

  // console.log("Req.files: ", req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  // console.log("CoverImagae:", coverImageLocalPath);
  // console.log("Avatar Localpath:", avatarLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //5.upload to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //6.create user object - create entry in db
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
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

  const { email, username, password } = req.body;
  console.log("User Details for login:", email);

  if (!email) {
    throw new ApiError(400, "Email is required!");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

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

export { registerUser, loginUser, logoutUser, refreshAccessToken };
