// hooks/useSocket.js
import { setSocket } from "@/redux/socket/socketSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";


// Custom hook to manage socket connection
const useSocket = () => {
  const [socket, setSocketState] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Determine the server URL dynamically
    const serverURL =
      process.env.NODE_ENV === "production"
        ? "https://your-production-server.com" // Your production server URL
        : "http://localhost:5173"; // Development URL

    // Assuming you're using socket.io-client to connect to the server
    const socketInstance = io(serverURL, {
      query: { userId: localStorage.getItem("userId") || "defaultUserId" }, // Pass userId as a query param
    });

    // Store the socket instance in the Redux store for global access
    dispatch(setSocket(socketInstance));
    setSocketState(socketInstance);

    // Cleanup on component unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [dispatch]);

  return socket;
};

export default useSocket;
