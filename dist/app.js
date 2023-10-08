"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const auth_1 = __importDefault(require("./routes/auth"));
const kanban_1 = __importDefault(require("./routes/kanban"));
const error_1 = require("./config/error");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/auth", auth_1.default);
app.use("/kanban", kanban_1.default);
app.use(error_1.errorHandler);
(0, database_1.connectToDB)(() => app.listen(3000, () => {
    console.log("Server started on: http://localhost:3000/");
}));
