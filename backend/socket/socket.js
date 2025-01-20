// src/socket.js
import { Server } from "socket.io";

let io;
const userSocketMap = {}; // Store user-to-socket mapping

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

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
    console.log("Query params:", socket.handshake.query);
  
    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log(`User ${userId} registered with socket ID ${socket.id}`);
    } else {
      console.warn(`Socket ID ${socket.id} connected without a userId.`);
    }
  
    // Emit online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
    // Handle typing status
    socket.on("typing", ({ receiverId }) => {
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", {
          senderId: userId,
        });
      }
    });

    socket.on("stopTyping", ({ receiverId }) => {
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stopTyping", {
          senderId: userId,
        });
      }
    });
  
    socket.on("disconnect", () => {
      const userIdToRemove = Object.keys(userSocketMap).find(
        (key) => userSocketMap[key] === socket.id
      );
      if (userIdToRemove) {
        delete userSocketMap[userIdToRemove];
        console.log(`User ${userIdToRemove} disconnected`);
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
  
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};