import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.route.js";

const app = express();

//  middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// CORS configuration
const CLIENT_ORIGIN = "https://chat-app-pearl-three.vercel.app/login; // 

if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: CLIENT_ORIGIN,
      credentials: true,
    })
  );
}


// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);

// Serve static files in production
// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

export default app;
