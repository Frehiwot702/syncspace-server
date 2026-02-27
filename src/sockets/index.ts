import { Server, Socket } from "socket.io";
import Message from "../models/message";
import Task from "../models/task";
import User from "../models/User";


export const initSockets = (io: Server): void => {

  io.on("connection", (socket: Socket) => {

    console.log("User connected:", socket.id);

    // Join channel/group room to share the same data within the group like live message update, user status (on/offline) and who is currently typing
    socket.on("join_channel", (channelId: string) => {
      console.log('join channel with id: ',channelId)
      socket.join(channelId);
    });

     // use typing
    socket.on("typing", (data) => {
      console.log('typing socket: ', data);
      io.to(data.channelId).emit("user_typing", data.userName);
    } )

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    // User online
    // socket.on("user_online", async (userId: string) => {
    //   await User.findByIdAndUpdate(userId, { status: "online" });
    //   console.log('user online status changed:', userId)
    //   io.emit("status_change_online", { userId });
    // });

    // User online
    // socket.on("user_offline", async (userId: string) => {
    //   await User.findByIdAndUpdate(userId, { status: "online" });
    //   console.log('user online status changed:', userId)
    //   io.emit("status_change_offline", { userId });
    // });

   

  });
};