import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "./redux/socket/socketSlice";
import { setOnlineUsers } from "./redux/user/userSlice";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const dispatch = useDispatch();
  // const BASE_URL = "http://localhost:5000";
  const BASE_URL = import.meta.env.NODE_ENV === 'production' 
  ? "*" 
  : "http://localhost:5000"

  useEffect(() => {
    if (currentUser) {
      console.log("Current user:", currentUser);
      // Initialize socket connection
      const socketInstance = io(BASE_URL, {
        query: {
          userId: currentUser._id,
        },
      });
      dispatch(setSocket(socketInstance));

      // Listen for online users
      socketInstance.on("getOnlineUsers", (onlineUsers) => {
        console.log("Online users:", onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Cleanup on component unmount or when currentUser changes
      return () => {
        console.log("Disconnecting socket...");
        socketInstance.disconnect();
        dispatch(setSocket(null)); // Optionally reset socket state
      };
    }
  }, [currentUser, dispatch]);

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
