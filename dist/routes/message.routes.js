"use strict";
// src/routes/message.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_1 = __importDefault(require("../models/message"));
const server_1 = require("../server");
const router = (0, express_1.Router)();
// GET message history for a channel
router.get("/:channelId", async (req, res) => {
    try {
        const { channelId } = req.params;
        const messages = await message_1.default.find({ channel: channelId }).populate("sender", "name status").sort({ createdAt: 1 });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch messages" });
    }
});
router.post("/send", async (req, res) => {
    try {
        console.log('add message request body: ', req.body);
        const result = new message_1.default(req.body);
        const saved = await result.save();
        console.log('result: ', saved);
        server_1.io.to(saved.channel.toString()).emit("receive_message", saved);
        res.status(201).json(saved);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to send message" });
    }
});
exports.default = router;
