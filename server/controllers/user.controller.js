import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";

// export const getUsers = asyncHandler(async (req, res) => {
//   const loggedInUserId = req.user._id;
//   console.log("Logged in user ID:", req.user._id);


//   const filteredUsers = await User.find({
//     _id: { $ne: loggedInUserId },
//   }).select("-password");

//   res.status(200).json(filteredUsers);
// });

export const getUsers = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user?._id;
  
    if (!loggedInUserId) {
      return res.status(400).json(new ApiResponse(false, "User not authenticated"));
    }
  
    console.log("Logged in user ID:", loggedInUserId);
  
    // Fetch all users for debugging purposes
    const allUsers = await User.find().select("-password");
    console.log("All users:", allUsers);
  
    // Fetch users excluding the logged-in user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
  
    console.log("Filtered users:", filteredUsers);
  
    if (filteredUsers.length === 0) {
      return res.status(404).json(new ApiResponse(false, "No other users found"));
    }
  
    res.status(200).json(filteredUsers);
  });
  
  