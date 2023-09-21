import { Schema, Types, model } from "mongoose";

export interface UserInterface {
  email: string;
  hashedPassword: string;
  username: string;
  boards: Types.ObjectId[];
}

const userSchema = new Schema<UserInterface>(
  {
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    boards: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Board",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const User = model<UserInterface>("User", userSchema);
