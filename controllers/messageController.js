import ah from "express-async-handler";
import { Message } from "../models/messageSchema.js";

export const sendMessage = ah(async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    res.status(400);
    throw new Error("Please fill out the entire form");
  }
  const newMessage = await Message.create({ firstName, lastName, email, phone, message });
  res.status(201).json({
    success: true,
    message: "Message Sent!",
    newMessage,
  });
});

export const getAllMessages = ah(async (req, res) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
