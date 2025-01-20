// // src/socket.js
// import { Server } from "socket.io";

// let io;
// const userSocketMap = {}; // Store user-to-socket mapping

// export const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

// // Initialize Socket.IO and return the IO instance
// export const initializeSocket = (httpServer) => {
//   io = new Server(httpServer, {
//     cors: {
//       origin: process.env.NODE_ENV === "production" ? "*" : "http://localhost:5173",
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {
//     const userId = socket.handshake.query.userId;
//     console.log("Query params:", socket.handshake.query);
  
//     if (userId) {
//       userSocketMap[userId] = socket.id;
//       console.log(`User ${userId} registered with socket ID ${socket.id}`);
//     } else {
//       console.warn(`Socket ID ${socket.id} connected without a userId.`);
//     }
  
//     // Emit online users
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
//     // Handle typing status
//     socket.on("typing", ({ receiverId }) => {
//       const receiverSocketId = userSocketMap[receiverId];
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("typing", {
//           senderId: userId,
//         });
//       }
//     });

//     socket.on("stopTyping", ({ receiverId }) => {
//       const receiverSocketId = userSocketMap[receiverId];
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("stopTyping", {
//           senderId: userId,
//         });
//       }
//     });
  
//     socket.on("disconnect", () => {
//       const userIdToRemove = Object.keys(userSocketMap).find(
//         (key) => userSocketMap[key] === socket.id
//       );
//       if (userIdToRemove) {
//         delete userSocketMap[userIdToRemove];
//         console.log(`User ${userIdToRemove} disconnected`);
//       }
//       io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     });
//   });
  
//   return io;
// };

// export const getIO = () => {
//   if (!io) {
//     throw new Error("Socket.IO not initialized");
//   }
//   return io;
// };

import { Server } from "socket.io";

let io;
const userSocketMap = {}; // Store userId to socketId mapping

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === "production" ? true : "http://localhost:5173", // Adjust CORS origin for development and production
      methods: ["GET", "POST"],
      credentials: true,  // Allow credentials (cookies, etc.)
    },
    transports: ['websocket', 'polling'],  // Allow websocket and polling transports
    pingTimeout: 60000,  // Set timeout for ping
    pingInterval: 25000,  // Set interval for ping
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;  // Get userId from query parameters
    
    if (userId) {
      userSocketMap[userId] = socket.id;  // Map userId to socketId
      console.log(`User ${userId} connected with socket ID ${socket.id}`);
      
      // Emit online users immediately on connection
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
      
      socket.on("disconnect", () => {
        const userIdToRemove = Object.keys(userSocketMap).find(
          (key) => userSocketMap[key] === socket.id
        );
        if (userIdToRemove) {
          delete userSocketMap[userIdToRemove];  // Remove user from the map
          console.log(`User ${userIdToRemove} disconnected`);
          io.emit("getOnlineUsers", Object.keys(userSocketMap));  // Emit updated list of online users
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