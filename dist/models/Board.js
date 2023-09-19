"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.Status = void 0;
const mongoose_1 = require("mongoose");
var Status;
(function (Status) {
    Status["todo"] = "todo";
    Status["doing"] = "doing";
    Status["done"] = "done";
})(Status || (exports.Status = Status = {}));
const boardSchema = new mongoose_1.Schema({
    title: String,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Board = (0, mongoose_1.model)("Board", boardSchema);
