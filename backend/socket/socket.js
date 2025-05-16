import { Server } from "socket.io";

let io;
const userSocketMap = {}; // Store userId to socketId mapping

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin:
        process.env.NODE_ENV === "production" ? true : "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    pingTimeout: 60000, // Set timeout for ping
    pingInterval: 25000, // Set interval for ping
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId; // Getting userId from query parameters

    if (userId) {
      userSocketMap[userId] = socket.id; // Mapping userId to socketId
      console.log(`User ${userId} connected with socket ID ${socket.id}`);

      // Emit online users immediately on connection
      io.emit("getOnlineUsers", Object.keys(userSocketMap));

      // Typing event handling
      // In the server code, emit typing events to the receiver
      socket.on("typing", (senderId, receiverId) => {
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("typing", senderId);
        }
      });

      socket.on("stopTyping", (senderId, receiverId) => {
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("stopTyping", senderId);
        }
      });

      // Handle disconnection
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
    }
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};
