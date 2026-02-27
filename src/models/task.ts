import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  assignedTo: Types.ObjectId;
  assignedBy: Types.ObjectId;
  workspace: Types.ObjectId;
  status: string;
}

const taskSchema = new Schema<ITask>(
  {
    title: { 
        type: String, 
        required: true 
    },
    assignedTo: { 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    },
    assignedBy: { 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    },
    workspace: { 
        type: Schema.Types.ObjectId, 
        ref: "Workspace" 
    },
    status: {
      type: String,
      enum: ["pending", "complete"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;