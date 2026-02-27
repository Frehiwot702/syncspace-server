"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        user.status = "online";
        user.save();
        // io.emit("status_change_online", user._id);
        console.log('user status when logged in: ', user.status);
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch channels" });
    }
});
router.post('/logout', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        user.status = "offline";
        user.save();
        // io.emit("status_change_offline", user._id);
        console.log('user status when logged out: ', user.status);
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch channels" });
    }
});
exports.default = router;
