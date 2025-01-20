// import express from "express";
// import cookieParser from "cookie-parser";
// import authRouter from "./routes/auth.routes.js";
// import messageRouter from "./routes/message.route.js";
// import cors from "cors";
// import path from "path";

// const __dirname = path.resolve();
// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(cookieParser());

// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/message", messageRouter);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// export default app;

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();

// Basic middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// CORS configuration
if (process.env.NODE_ENV === "production") {
  app.use(cors()); // In production, allow same-origin requests
} else {
  app.use(cors({
    origin: "http://localhost:5173", // Allow requests from local frontend during development
    credentials: true,  // Allow credentials (cookies)
  }));
}

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

export default app;
