import { Schema, Types, model } from "mongoose";

export enum Status {
  todo = "todo",
  doing = "doing",
  done = "done",
}

export interface TaskInterface {
  title: string;
  subtasks: {
    title: string;
    isDone: Boolean;
  }[];
  status: Status;
}

export interface BoardInterface {
  title: string;
  user: Types.ObjectId;
  todo: TaskInterface[];
  doing: TaskInterface[];
  done: TaskInterface[];
}

const boardSchema = new Schema<BoardInterface>(
  {
    title: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    todo: {
      default: [],
    },
    doing: {
      default: [],
    },
    done: {
      default: [],
    },
  },
  { timestamps: true }
);

export const Board = model<BoardInterface>("Board", boardSchema);
