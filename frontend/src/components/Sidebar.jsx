/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OtherUsersSuccess, selectUser } from "../redux/user/userSlice";
import { axiosInstance } from "@/lib/axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { otherUsers } = useSelector((state) => state.user);

  // Fetch other users
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
    <div className="w-full h-full p-4 text-white bg-slate-950"> {/* Full height */}
      <h2 className="mb-4 text-xl font-bold">Contacts</h2>
      <ScrollArea className="h-full pr-2"> {/* Full height of the available space */}
        <ul className="space-y-4">
          {otherUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => dispatch(selectUser(user))} // Dispatch selected user
            >
              <Avatar className="relative">
                <AvatarImage
                  src={user.profileImage || "/default-avatar.png"}
                  alt={user.fullName}
                />
                <AvatarFallback className="absolute inset-0 flex items-center justify-center text-2xl text-white bg-red-400 rounded-full">
                  {user.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.fullName}</p>
              </div>
              <Badge variant="solid" className="px-3 py-1 ml-auto text-white bg-gray-700 rounded-full">
                Offline
              </Badge>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
