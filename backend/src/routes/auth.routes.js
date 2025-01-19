import { Router } from "express";
import {
  checkAuth,
  getUsersforSidebar,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);

router.route("/update-profile").put(verifyJWT, updateProfile);
router.route("/check").get(verifyJWT, checkAuth);
router.route("/users").get(verifyJWT, getUsersforSidebar);

export default router;
