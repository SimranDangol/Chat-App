/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setSocket, setSocketInstance } from "@/redux/socket/socketSlice";

export const useSocket = () => {
  const [socket, setSocketState] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const serverURL =
      process.env.NODE_ENV === "production"
        ? "https://chat-app-1-vb3u.onrender.com"
        : "http://localhost:5000";

    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.warn("No userId found in localStorage");
      return;
    }

    try {
      const socketInstance = io(serverURL, {
        query: { userId },
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      });

      socketInstance.on("connect", () => {
        console.log("Socket connected:", socketInstance.id);
        dispatch(setSocket({ id: socketInstance.id }));
      });

      socketInstance.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      // Store the socket instance but only dispatch serializable data to Redux
      setSocketState(socketInstance);
      setSocketInstance(socketInstance);

      return () => {
        console.log("Cleaning up socket connection");
        socketInstance.disconnect();
        setSocketInstance(null);
        dispatch(setSocket(null));
      };
    } catch (error) {
      console.error("Failed to initialize socket:", error);
    }
  }, [dispatch]);

  return socket;
};
