import { Schema, Types, model } from "mongoose";

import { Status } from "./Board";

export interface TaskInterface {
  title: string;
  subtasks: {
    title: string;
    isDone: Boolean;
  }[];
  status: Status;
}

const taskSchema = new Schema<TaskInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    subtasks: {
      type: [
        {
          title: String,
          isDone: Boolean,
        },
      ],
      default: [],
    },
    status: { type: String, default: Status.todo },
  },
  { timestamps: true }
);

export const Task = model<TaskInterface>("Task", taskSchema);
