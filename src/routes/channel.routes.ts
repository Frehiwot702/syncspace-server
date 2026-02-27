// src/routes/channel.routes.ts

import { Router, Request, Response } from "express";
import Channel from "../models/channel";
import Workspace from "../models/workspace";

const router = Router();

// channels inside a workspace
router.get("/:workspaceId", async (req: Request, res: Response) => {
  try {
    const { workspaceId } = req.params;

    console.log('workspace id: ', workspaceId);

    const channels = await Channel.find({ workspace: workspaceId }).populate({
      path: "workspace",
      select: "name members",
      populate: {
        path: "members",
        select: "name email status role"
      }
    });

    res.status(200).json(channels);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch channels" });
  }
});

export default router;