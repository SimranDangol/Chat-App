// /* eslint-disable no-undef */
// import { LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../lib/axios.js";
// import { useDispatch } from "react-redux";
// import {
//   signOutStart,
//   signOutSuccess,
//   signOutFailure,
// } from "../redux/user/userSlice.js";
// import { toast } from "sonner";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     dispatch(signOutStart());
//     try {
//       await axiosInstance.post(`${import.meta.env.VITE_API_URL}/auth/logout`); // Call backend to logout
//       dispatch(signOutSuccess());
//       toast.success("Logout successful");
//       navigate("/login"); // Redirect to login page
//     } catch (error) {
//       console.error("Logout failed", error);
//       dispatch(signOutFailure(error.message));
//       toast.error("Logout failed");
//     }
//   };

//   return (
//     <nav className="flex items-center justify-between px-4 py-2 text-yellow-500 bg-black">
//       <div className="text-lg font-bold">
//         <Link to="/">Chat</Link>
//       </div>

//       {/* Navigation Links */}
//       <div className="flex items-center gap-4">
//         {/* Logout */}
//         <Button
//           variant="ghost"
//           size="sm"
//           className="flex items-center gap-2"
//           onClick={handleLogout}
//         >
//           <LogOut className="w-4 h-4" />
//           <span>Logout</span>
//         </Button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
/* eslint-disable no-undef */
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice.js";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user); // Get current user from Redux store

  const handleLogout = async () => {
    dispatch(signOutStart());
    try {
      await axiosInstance.post("/auth/logout");
      dispatch(signOutSuccess());
      toast.success("Logout successful");
      navigate("/login");
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
        {/* Show logout only if user is logged in */}
        {currentUser && (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
