import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  status: "online" | "offline";
}

const userSchema = new Schema<IUser>(
  {
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user"
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline"
    }
  },
  { timestamps: true }
);

const User  = mongoose.model<IUser>("User", userSchema);

export default User;