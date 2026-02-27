import { Request, Response, Router } from "express";
import User from "../models/User";
import { io } from "../server";


const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        if(user.password !== password) {
            return res.status(400).json({message: "Incorrect password"})
        }

        user.status = "online";
        user.save();
        // io.emit("status_change_online", user._id);
        
        console.log('user status when logged in: ', user.status);

        res.status(200).json({user});

    }  catch (error) {
        res.status(500).json({ message: "Failed to fetch channels" });
    }
})

router.post('/logout', async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);

        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        user.status = "offline";
        user.save();
        // io.emit("status_change_offline", user._id);
        console.log('user status when logged out: ', user.status);

        res.status(200).json({user});

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch channels" });
    }
})

export default router;