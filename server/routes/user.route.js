import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUsers } from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(verifyJWT, getUsers);

export default router;
