"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const Board_1 = require("./Board");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    subtasks: {
        type: [
            {
                title: String,
                isDone: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        default: [],
    },
    status: { type: String, default: Board_1.Status.todo },
}, { timestamps: true });
exports.Task = (0, mongoose_1.model)("Task", taskSchema);
