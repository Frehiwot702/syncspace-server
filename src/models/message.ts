import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMessage extends Document {
  channel: Types.ObjectId;
  sender: Types.ObjectId;
  content: string;
}

const messageSchema = new Schema<IMessage>(
  {
    channel: { 
      type: Schema.Types.ObjectId, 
      ref: "Channel" 
    },
    sender: { 
      type: Schema.Types.ObjectId, 
      ref: "User" 
    },
    content: { 
      type: String, 
      required: true 
    }
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;