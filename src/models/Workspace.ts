import mongoose, { Document, Schema, Types } from "mongoose";

export interface IWorkspace extends Document {
  name: string;
  members: Types.ObjectId[];
}

const workspaceSchema = new Schema<IWorkspace>({
    name: { 
        type: String, 
        required: true 
    },
    members: [{ 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    }]
});

const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);

export default Workspace;