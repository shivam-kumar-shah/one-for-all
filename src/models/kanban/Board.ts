import { Schema, Types, model } from "mongoose";

export enum Status {
  todo = "todo",
  doing = "doing",
  done = "done",
}

export interface BoardInterface {
  title: string;
  user: Types.ObjectId;
  todo: Types.ObjectId[];
  doing: Types.ObjectId[];
  done: Types.ObjectId[];
}

const boardSchema = new Schema<BoardInterface>(
  {
    title: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    todo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
        default: [],
      },
    ],
    doing: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
        default: [],
      },
    ],
    done: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const Board = model<BoardInterface>("Board", boardSchema);
