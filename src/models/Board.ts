import { Schema, model } from "mongoose";
import { User } from "./User";

export enum Status {
    todo = "todo",
    doing = "doing",
    done = "done",
}

const boardSchema = new Schema({
    title: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    todo: [
        {
            title: String,
            subtasks: [
                {
                    title: String,
                    isDone: Boolean,
                },
            ],
            status: Status,
        },
    ],
    doing: [
        {
            title: String,
            subtasks: [
                {
                    title: String,
                    isDone: Boolean,
                },
            ],
            status: Status,
        },
    ],
    done: [
        {
            title: String,
            subtasks: [
                {
                    title: String,
                    isDone: Boolean,
                },
            ],
            status: Status,
        },
    ],
    createdOn: Date,
    lastUpdated: Date,
});

export const Board = model("Board", boardSchema);
