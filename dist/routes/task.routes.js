"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = __importDefault(require("../models/task"));
const router = (0, express_1.Router)();
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('user id: ', userId);
        const tasks = await task_1.default.find({
            assignedTo: userId
        });
        console.log('task based on user id ', tasks);
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
});
