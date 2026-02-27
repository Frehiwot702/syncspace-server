"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workspace_1 = __importDefault(require("../models/Workspace"));
const router = (0, express_1.Router)();
// gets all workspaces where user is a member of
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('user id: ', userId);
        const ws = await Workspace_1.default.find({});
        console.log('ws', ws);
        res.status(200).json(ws);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch workspaces" });
    }
});
exports.default = router;
