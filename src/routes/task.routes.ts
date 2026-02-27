import { Request, Response, Router } from "express";
import Task from "../models/task";

const router = Router();

router.get('/:userId', async (req: Request, res: Response) => {
    try {
    const { userId } = req.params;

    console.log('user id: ', userId);

    const tasks = await Task.find({
      assignedTo: userId
    });

    console.log('task based on user id ', tasks)

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
})