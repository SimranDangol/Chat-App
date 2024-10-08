import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  // this will run in parallel
  await Promise.all([conversation.save(), newMessage.save()]);

  res.status(200).json(new ApiResponse(200, newMessage));
});

export const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate("messages")

  if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);


});
