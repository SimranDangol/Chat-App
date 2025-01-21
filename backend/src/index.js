// import dotenv from "dotenv";
// import { connectDB } from "./lib/db.js";
// import app from "./app.js";
// import http from "http";
// import { initializeSocket } from "../socket/socket.js";

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// // Create HTTP server
// const server = http.createServer(app);

// // Initialize Socket.IO
// initializeSocket(server);

// // Connect to MongoDB and start the server
// connectDB()
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log(`Server is running at port: ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection failed:", err);
//   });

// //   import { getIO } from '../socket.js';

import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import app from "./app.js";
import http from "http";
import { initializeSocket } from "../socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
