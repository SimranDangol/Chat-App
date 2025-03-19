import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "@/hooks/useSocket"; // Ensure you are using the socket instance

const TypingIndicator = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const [isTyping, setIsTyping] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      // Listen for typing events from the selected user
      socket.on("typing", (senderId) => {
        if (selectedUser?._id === senderId) {
          setIsTyping(true);
        }
      });

      socket.on("stopTyping", (senderId) => {
        if (selectedUser?._id === senderId) {
          setIsTyping(false);
        }
      });

      // Cleanup on component unmount
      return () => {
        socket.off("typing");
        socket.off("stopTyping");
      };
    } else {
      console.warn("Socket is not initialized yet");
    }
  }, [socket, selectedUser]);

  return (
    isTyping && (
      <div className="text-sm text-gray-500">
        {selectedUser?.name} is typing...
      </div>
    )
  );
};

export default TypingIndicator;
