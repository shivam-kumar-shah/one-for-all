"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Board",
            },
        ],
        default: [],
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
