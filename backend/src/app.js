import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.route.js";

const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins =
      process.env.NODE_ENV === "production"
        ? ["https://chat-app-wbtr.onrender.com"]
        : ["http://localhost:5173", "http://127.0.0.1:5173"];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

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
