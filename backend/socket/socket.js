import { Server } from "socket.io";

let io;
const userSocketMap = {}; // Store user-to-socket mapping

// Initialize Socket.IO and return the IO instance
export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("Socket connection attempt with userId:", userId);

    if (!userId || userId === 'undefined') {
      console.warn("Invalid user ID, disconnecting socket");
      socket.disconnect();
      return;
    }

    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
    console.log("Current online users:", Object.keys(userSocketMap));

    // Emit updated online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      const userIdToRemove = Object.keys(userSocketMap).find(
        (key) => userSocketMap[key] === socket.id
      );
      
      if (userIdToRemove) {
        delete userSocketMap[userIdToRemove];
        console.log(`User ${userIdToRemove} disconnected`);
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });

  return io;
};