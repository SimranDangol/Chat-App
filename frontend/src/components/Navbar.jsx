import React from "react";
import { Settings, User, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import { useDispatch } from "react-redux";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice.js";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  

  const handleLogout = async () => {
    dispatch(signOutStart());
    try {
      await axiosInstance.post("/auth/logout"); // Call backend to logout
      dispatch(signOutSuccess());
      toast.success("Logout successful");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
      dispatch(signOutFailure(error.message));
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 text-yellow-500 bg-black">
      <div className="text-lg font-bold">
        <Link to="/">Chat</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
            3
          </span>
        </Button>

        {/* Logout */}
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;



