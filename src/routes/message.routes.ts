// src/routes/message.routes.ts

import { Router, Request, Response } from "express";
import Message from "../models/message";
import { Server } from "socket.io";
import { io } from "../server";

const router = Router();


// GET message history for a channel

router.get("/:channelId", async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;

    const messages = await Message.find({ channel: channelId }).populate("sender", "name status").sort({ createdAt: 1 });

    res.status(200).json(messages);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

router.post("/send", async (req: Request, res: Response) => {
  try {
      console.log('add message request body: ', req.body);

      const result = new Message(req.body);
      const saved = await result.save();
      console.log('result: ', saved);
      io.to(saved.channel.toString()).emit("receive_message", saved);
      res.status(201).json(saved);

    } catch (error: any) {
        res.status(500).json({message: "Failed to send message"});
    }
})

export default router;