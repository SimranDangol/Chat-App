import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/send/:id").post(verifyJWT, sendMessage);
router.route("/:id").get(verifyJWT, getMessages);

export default router;
