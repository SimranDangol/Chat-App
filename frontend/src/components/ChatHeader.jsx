/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { deselectUser } from "../redux/user/userSlice";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);

  if (!selectedUser) {
    return null; // Render nothing if no user is selected
  }

  return (
    <div className="flex items-center justify-between p-4 text-white border-b border-gray-800 bg-slate-950">
      {/* Left Section: Avatar and Info */}
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={selectedUser.profileImage}
            alt={selectedUser.fullName}
          />
          <AvatarFallback className="bg-red-400">{selectedUser.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{selectedUser.fullName}</p>
          <p className="text-xs text-lime-400">Offline</p>
        </div>
      </div>

      {/* Right Section: Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-yellow-500"
        onClick={() => dispatch(deselectUser())} // Clear selected user
      >
        ✕
      </Button>
    </div>
  );
};

export default ChatHeader;
