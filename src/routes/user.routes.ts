import { Router, Request, Response } from "express";
import { connectDB } from "../config/db";
import User from "../models/User";

const router = Router();

// gets all users info
router.get('/all', async (req: Request, res: Response) => {
    try {
        const ws =  await User.find({});
        console.log('user', ws);

        res.status(200).json(ws);
    } catch (error: any) {
        res.status(500).json({message: "Failed to fetch users"});
    } 
})

router.post('/add', async (req: Request, res: Response) => {
    try {
        const data  =  {
            name: "Frehiwot Tewodros",
            email: "frehiwot.tewodros112@gmail.com",
            password: "123",
            role: "admin",
            status: "offline"
        }

        const res = new User(data);
        const saved = await res.save();
        console.log('result: ', res, saved);

    } catch (error: any) {
        res.status(500).json({message: "Failed to insert user data"});
    }
})

export default router;