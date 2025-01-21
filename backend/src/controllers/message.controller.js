import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, getIO } from "../../socket/socket.js";

export const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  })
    .populate("senderId", "fullName _id")
    .populate("receiverId", "fullName _id")
    .sort({ createdAt: 1 }); // Sort by creation time

  return res.status(200).json(new ApiResponse(200, messages));
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
  });
  console.log("New Message Created:", newMessage);

  const populatedMessage = await Message.findById(newMessage._id)
    .populate("senderId", "fullName _id")
    .populate("receiverId", "fullName _id");

  const receiverSocketId = getReceiverSocketId(receiverId);

  // SOCKET.IO implementation
  if (receiverSocketId) {
    const io = getIO();
    io.to(receiverSocketId).emit("newMessage", {
      message: populatedMessage,
    });
  }

  return res.status(201).json(new ApiResponse(201, populatedMessage));
});
