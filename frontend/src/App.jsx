/* eslint-disable no-undef */
import  { useEffect } from "react";
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
  const dispatch = useDispatch();


  const SOCKET_SERVER_URL =
    process.env.NODE_ENV === "production"
      ? "https://chat-app-1-vb3u.onrender.com"
      : "http://localhost:5000";

  useEffect(() => {
    if (currentUser) {
      console.log("Current user:", currentUser);

      try {
        const socketInstance = io(SOCKET_SERVER_URL, {
          query: {
            userId: currentUser._id,
          },
          withCredentials: true,
          transports: ["websocket", "polling"],
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          timeout: 20000, // Increased timeout
        });

        // Add connection event listeners for better debugging
        socketInstance.on("connect", () => {
          console.log("Socket connected successfully:", socketInstance.id);
        });

        socketInstance.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
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
          dispatch(setSocket(null));
        };
      } catch (error) {
        console.error("Failed to initialize socket:", error);
      }
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
