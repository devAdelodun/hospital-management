import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import validateToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", validateToken, getAllMessages);

export default router;
