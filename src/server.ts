import express from "express";
import http, { METHODS } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db";
import { initSockets } from "./sockets";

import workspaceRoutes from "./routes/workspace.routes";
import channelRoutes from "./routes/channel.routes";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/",(req,res,next)=>{
//   res.send(
//     "hello"
//   )
// });



const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "https://syncspace-client-masters.vercel.app",
    methods: ["POST", "GET", "PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
});

connectDB();
initSockets(io);

app.use("/api/workspaces", workspaceRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/messages", messageRoutes);
app.use("/", userRoutes)
app.use("/api/auth", authRoutes);

server.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});