/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/redux/chat/messageslice";
import { axiosInstance } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedUser, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        {
          text: message,
          senderId: localStorage.getItem("userId") || currentUser?._id,
        }
      );

      if (res.data?.data) {
        dispatch(addMessage(res.data.data));
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-900 border-t border-gray-800 sm:p-3 md:p-4"
    >
      <div className="flex items-center gap-2 sm:gap-1 md:gap-3">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 text-gray-200 bg-gray-800 border-gray-700 placeholder:text-gray-500 sm:h-10 sm:text-sm md:h-12 md:text-base"
        />
        <Button
          type="submit"
          disabled={!message.trim()}
          className="px-3 py-2 sm:px-2 sm:py-1 md:px-3 md:py-2"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
