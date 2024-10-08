import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// ROUTES IMPORT
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
const corsOptions = { origin: process.env.URL, credentials: true };
app.use(cors(corsOptions));

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);

export default app;
