"use strict";
// src/routes/channel.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channel_1 = __importDefault(require("../models/channel"));
const router = (0, express_1.Router)();
// channels inside a workspace
router.get("/:workspaceId", async (req, res) => {
    try {
        const { workspaceId } = req.params;
        console.log('workspace id: ', workspaceId);
        const channels = await channel_1.default.find({ workspace: workspaceId }).populate({
            path: "workspace",
            select: "name members",
            populate: {
                path: "members",
                select: "name email status role"
            }
        });
        res.status(200).json(channels);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch channels" });
    }
});
exports.default = router;
