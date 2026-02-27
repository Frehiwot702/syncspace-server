import mongoose, { Document, Schema, Types } from "mongoose";

export interface IChannel extends Document {
  name: string;
  workspace: Types.ObjectId;
}

const channelSchema = new Schema<IChannel>({
    name: { 
        type: String, 
        required: true 
    },
    workspace: {
        type: Schema.Types.ObjectId,
        ref: "Workspace"
    }
});

const Channel = mongoose.model<IChannel>("Channel", channelSchema);

export default Channel;