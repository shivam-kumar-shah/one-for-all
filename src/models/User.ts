import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: String,
  hashedPassword: String,
  username: String,
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  ],
});

export const User = model("User", userSchema);
