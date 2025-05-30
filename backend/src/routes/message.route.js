import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.route("/:id").get(verifyJWT, getMessages);
router.route("/send/:id").post(verifyJWT, sendMessage);

export default router;
