"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: String,
    hashedPassword: String,
    username: String,
    boards: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Board",
        },
    ],
});
exports.User = (0, mongoose_1.model)("User", userSchema);
