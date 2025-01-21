/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OtherUsersSuccess, selectUser } from "../redux/user/userSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { axiosInstance } from "@/lib/axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { otherUsers, onlineUsers } = useSelector((state) => state.user);

  const fetchOtherUsers = async () => {
    try {
      const res = await axiosInstance.get("/auth/users");
      dispatch(OtherUsersSuccess(res.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchOtherUsers();
  }, [dispatch]);

  return (
    <div className="flex flex-col w-20 h-screen transition-all duration-300 bg-gray-900 border-r border-gray-800 md:w-80">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-400" />
          <h2 className="hidden text-lg font-semibold text-gray-200 md:block">
            Contacts
          </h2>
        </div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-2">
          {otherUsers.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            return (
              <button
                key={user._id}
                onClick={() => dispatch(selectUser(user))}
                className="flex items-center w-full gap-3 px-3 py-2 transition-colors rounded-lg group hover:bg-gray-800"
              >
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-10 h-10 border-2 border-transparent group-hover:border-gray-700">
                    <AvatarImage
                      src={user.profileImage || "/default-avatar.png"}
                    />
                    <AvatarFallback className="text-gray-200 bg-gray-700">
                      {user.fullName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full" />
                  )}
                </div>

                {/* User Info - Hidden on mobile */}
                <div className="flex-col hidden md:flex">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-200 truncate">
                      {user.fullName}
                    </span>
                    <span
                      className={`text-xs ml-2 ${
                        isOnline ? "text-green-400" : "text-gray-400"
                      }`}
                    >
                      {isOnline ? "Active now" : "Offline"}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
