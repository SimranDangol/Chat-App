// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deselectUser } from "../redux/user/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);
  const isOnline = onlineUsers.includes(selectedUser?._id);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10 border-2 border-gray-800">
          <AvatarImage src={selectedUser?.profileImage || "/default-avatar.png"} />
          <AvatarFallback className="text-gray-200 bg-gray-700">
            {selectedUser?.fullName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-base font-semibold text-gray-200">
            {selectedUser?.fullName}
          </h3>
          <p className={`text-sm ${isOnline ? "text-green-400" : "text-gray-400"}`}>
            {isOnline ? "Active now" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Separator orientation="vertical" className="h-6 mx-2" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(deselectUser())}
          className="text-gray-400 hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
