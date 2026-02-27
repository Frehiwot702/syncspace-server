import { Router, Request, Response } from "express";
import Workspace from "../models/workspace";

const router = Router();

// gets all workspaces where user is a member of
router.get('/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        console.log('user id: ', userId)
        const ws =  await Workspace.find({});
        console.log('ws', ws);

        res.status(200).json(ws);
    } catch (error: any) {
        res.status(500).json({message: "Failed to fetch workspaces"});
    } 
});

export default router;