import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Fullname is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true, // removes unwanted whitespace
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
      maxLength: 16,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female"],
    },
    avatar: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//hash the password // hooks
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Hooks // password sent to the login is not hashed so we use = bcrypt.compare
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
export default User;
