import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "./redux/socket/socketSlice";
import { setOnlineUsers } from "./redux/user/userSlice";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    if (currentUser?._id) {
      console.log("Connecting socket with user ID:", currentUser._id);
      
      const socket = io(BASE_URL, {
        withCredentials: true,
        query: {
          userId: currentUser._id.toString()
        }
      });

      socket.on("connect", () => {
        console.log("Socket connected successfully");
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      socket.on("getOnlineUsers", (onlineUsers) => {
        console.log("Online users received:", onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      });

      dispatch(setSocket(socket));

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [currentUser, dispatch]); // <-- Added closing parenthesis

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={currentUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="profile"
            element={currentUser ? <Profile /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
