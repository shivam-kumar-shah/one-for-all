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
    title: { type: String, required: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.Board = (0, mongoose_1.model)("Board", boardSchema);
