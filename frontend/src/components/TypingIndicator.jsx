import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useSocket from "@/hooks/useSocket";  // Ensure you are using the socket instance

const TypingIndicator = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const [isTyping, setIsTyping] = useState(false);
  const socket = useSocket();  // Get socket instance from custom hook

  useEffect(() => {
    if (socket) {
      // Listen for typing event
      socket.on("typing", (senderId) => {
        if (senderId !== selectedUser?._id) {
          setIsTyping(true);  // Show typing indicator when the other user is typing
        }
      });

      // Listen for stopTyping event
      socket.on("stopTyping", (senderId) => {
        if (senderId !== selectedUser?._id) {
          setIsTyping(false);  // Hide typing indicator when the other user stops typing
        }
      });

      // Cleanup event listeners on component unmount
      return () => {
        socket.off("typing");
        socket.off("stopTyping");
      };
    }
  }, [socket, selectedUser]);  // Run effect when socket or selectedUser changes

  return (
    isTyping && (
      <div className="text-sm text-gray-500">
        {selectedUser?.name} is typing...
      </div>
    )
  );
};

export default TypingIndicator;
