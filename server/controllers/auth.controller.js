import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const generateRefreshandAccessTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken; // Store refresh token in the database
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

export const register = asyncHandler(async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  if (
    [fullName, username, password, gender].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  const existedUser = await User.findOne({ username });
  if (existedUser) {
    throw new ApiError(409, "User with this username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Generate profile picture based on gender
  const boyPic = `https://xsgames.co/randomusers/avatar.php?g=male&username=${username}`;
  const girlPic = `https://xsgames.co/randomusers/avatar.php?g=female&username=${username}`;

  const user = await User.create({
    fullName,
    username,
    password,
    gender,
    avatar: avatar.url,
    profilePic: gender === "male" ? boyPic : girlPic,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Username and password is required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateRefreshandAccessTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //Cookie
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in Successfully"
      )
    );
});

export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
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
    .json(new ApiResponse(200, {}, "User logged Out"));
});
