import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setSocket } from "@/redux/socket/socketSlice";

export const useSocket = () => {
  const [socket, setSocketState] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const serverURL =
      process.env.NODE_ENV === "production"
        ? "https://your-production-server.com"
        : "http://localhost:5173";

    const socketInstance = io(serverURL, {
      query: { userId: localStorage.getItem("userId") || "defaultUserId" },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });

    setSocketState(socketInstance);
    dispatch(setSocket(socketInstance));

    return () => {
      socketInstance.disconnect();
    };
  }, [dispatch]);

  return socket;
};
