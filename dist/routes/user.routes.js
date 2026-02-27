"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// gets all users info
router.get('/all', async (req, res) => {
    try {
        const ws = await User_1.default.find({});
        console.log('user', ws);
        res.status(200).json(ws);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
});
router.post('/add', async (req, res) => {
    try {
        const data = {
            name: "Frehiwot Tewodros",
            email: "frehiwot.tewodros112@gmail.com",
            password: "123",
            role: "admin",
            status: "offline"
        };
        const res = new User_1.default(data);
        const saved = await res.save();
        console.log('result: ', res, saved);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to insert user data" });
    }
});
exports.default = router;
