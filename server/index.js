import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();  // Load environment variables from .env file

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
