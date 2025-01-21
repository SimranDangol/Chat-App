import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    let token = req.cookies?.accessToken;

    if (!token) {
      const authHeader = req.header("Authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.replace("Bearer ", "");
      }
    }

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }

      req.user = user;
      next();
    } catch (error) {
      // If access token is expired, try refresh token
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        throw new ApiError(401, "Access token expired and no refresh token");
      }

      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        const user = await User.findById(decodedRefresh._id).select(
          "-password"
        );

        if (!user || refreshToken !== user.refreshToken) {
          throw new ApiError(401, "Invalid refresh token");
        }

        // Generate new tokens
        const accessToken = jwt.sign(
          { _id: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        const options = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        };

        res.cookie("accessToken", accessToken, options);
        req.user = user;
        next();
      } catch (refreshError) {
        throw new ApiError(401, "Authentication failed");
      }
    }
  } catch (error) {
    throw new ApiError(401, error?.message || "Authentication failed");
  }
});
