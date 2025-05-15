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
import cors from "cors";

const CLIENT_ORIGIN = "https://chat-app-pearl-three.vercel.app";

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true, // Required for cookies/auth
  })
);

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);

export default app;
