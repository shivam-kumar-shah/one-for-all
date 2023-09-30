"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.deleteBoard = exports.addSubTask = exports.editTask = exports.editBoard = exports.postTask = exports.postBoard = exports.getBoardById = exports.getAllBoards = void 0;
const User_1 = require("../../models/auth/User");
const Board_1 = require("../../models/kanban/Board");
const Task_1 = require("../../models/kanban/Task");
const getAllBoards = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth } = req.body;
        const doc = yield User_1.User.findById(auth === null || auth === void 0 ? void 0 : auth.id).populate({
            path: "boards",
            select: ["_id", "title", "createdAt", "updatedAt"],
        });
        res.send({
            uid: doc === null || doc === void 0 ? void 0 : doc._id,
            username: doc === null || doc === void 0 ? void 0 : doc.username,
            email: doc === null || doc === void 0 ? void 0 : doc.email,
            boards: doc === null || doc === void 0 ? void 0 : doc.boards,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllBoards = getAllBoards;
const getBoardById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const doc = yield Board_1.Board.findById(id)
            .populate(Board_1.Status.todo)
            .populate(Board_1.Status.doing)
            .populate(Board_1.Status.done);
        if (!doc) {
            res.status(403).send({
                status: "Forbidden.",
                message: "Auth Error. Invalid User.",
            });
            return;
        }
        res.send({
            uid: (_a = doc === null || doc === void 0 ? void 0 : doc.user) === null || _a === void 0 ? void 0 : _a._id,
            id: doc === null || doc === void 0 ? void 0 : doc.id,
            todo: doc === null || doc === void 0 ? void 0 : doc.todo,
            doing: doc === null || doc === void 0 ? void 0 : doc.doing,
            done: doc === null || doc === void 0 ? void 0 : doc.done,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getBoardById = getBoardById;
const postBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body.payload;
        const { id } = req.body.auth;
        const foundUser = yield User_1.User.findById(id);
        if (!foundUser) {
            res.status(404).send({
                status: "Resource not found.",
                message: "User not found. Try signing up.",
            });
            return;
        }
        const newBoard = new Board_1.Board({ title, user: foundUser });
        foundUser.boards.push(newBoard.id);
        yield foundUser.save();
        yield newBoard.save();
        res.status(201).send({
            status: "Resource created.",
            message: "Board created successfully.",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.postBoard = postBoard;
const postTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, id: boardId, status, subtasks } = req.body.payload;
        const { id } = req.body.auth;
        const foundUser = yield User_1.User.findById(id);
        if (!foundUser) {
            res.status(404).send({
                status: "Resource not found.",
                message: "User not found. Try signing up.",
            });
            return;
        }
        const foundBoard = yield Board_1.Board.findById(boardId);
        if (!foundBoard) {
            res.status(404).send({
                status: "Resource not found.",
                message: "Invalid board ID.",
            });
            return;
        }
        const newTask = new Task_1.Task({ title, status, subtasks });
        foundBoard[status !== null && status !== void 0 ? status : Board_1.Status.todo].push(newTask.id);
        yield foundBoard.save();
        yield newTask.save();
        res.status(201).send({
            status: "Resource created.",
            message: "Task created successfully.",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.postTask = postTask;
const editBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, id: boardId } = req.body.payload;
        const { id } = req.body.auth;
        const foundUser = yield User_1.User.findById(id);
        if (!foundUser) {
            res.status(404).send({
                status: "Resource not found.",
                message: "User not found. Try signing up.",
            });
            return;
        }
        const foundBoard = yield Board_1.Board.findById(boardId);
        if (!foundBoard) {
            res.status(404).send({
                status: "Resource not found.",
                message: "Invalid board ID.",
            });
            return;
        }
        foundBoard.title = title;
        yield foundBoard.save();
        res.status(204).send({
            status: "Resource updated.",
            message: "Board updated successfully.",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.editBoard = editBoard;
const editTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: taskId, title, subtasks, status } = req.body.payload;
        const { id } = req.body.auth;
        const foundUser = yield User_1.User.findById(id);
        if (!foundUser) {
            res.status(404).send({
                status: "Resource not found.",
                message: "User not found. Try signing up.",
            });
            return;
        }
        const foundTask = yield Task_1.Task.findById(taskId);
        if (!foundTask) {
            res.status(404).send({
                status: "Resource not found.",
                message: "Invalid task ID.",
            });
            return;
        }
        foundTask.title = title;
        foundTask.status = status !== null && status !== void 0 ? status : Board_1.Status.todo;
        foundTask.subtasks = subtasks;
        yield foundTask.save();
        res.status(204).send({
            status: "Resource updated.",
            message: "Task updated successfully.",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.editTask = editTask;
const addSubTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: taskId, title, isDone } = req.body.payload;
        const { id } = req.body.auth;
        const foundUser = yield User_1.User.findById(id);
        if (!foundUser) {
            res.status(404).send({
                status: "Resource not found.",
                message: "User not found. Try signing up.",
            });
            return;
        }
        const foundTask = yield Task_1.Task.findById(taskId);
        if (!foundTask) {
            res.status(404).send({
                status: "Resource not found.",
                message: "Invalid task ID.",
            });
            return;
        }
        foundTask.subtasks.push({
            title,
            isDone: isDone !== null && isDone !== void 0 ? isDone : false,
        });
        yield foundTask.save();
        res.status(201).send({
            status: "Resource created.",
            message: "Subtask created successfully.",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.addSubTask = addSubTask;
const deleteBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: boardId } = req.body.payload;
        const { id } = req.body.auth;
        const foundUser = yield User_1.User.findById(id);
        if (!foundUser) {
            res.status(404).send({
                status: "Resource not found.",
                message: "User not found. Try signing up.",
            });
            return;
        }
        const foundBoard = yield Board_1.Board.findById(boardId);
        if (!foundBoard) {
            res.status(404).send({
                status: "Resource not found.",
                message: "Invalid board ID.",
            });
            return;
        }
        foundBoard.deleteOne();
        foundUser.boards = foundUser.boards.filter((id) => id.toString() != boardId);
        yield foundBoard.save();
        yield foundUser.save();
        res.status(204);
        return;
    }
    catch (err) {
        next(err);
    }
});
exports.deleteBoard = deleteBoard;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: taskId, boardId } = req.body.payload;
        const { id } = req.body.auth;
        const foundUser = yield User_1.User.findById(id);
        if (!foundUser) {
            res.status(404).send({
                status: "Resource not found.",
                message: "User not found. Try signing up.",
            });
            return;
        }
        const foundTask = yield Task_1.Task.findById(taskId);
        if (!foundTask) {
            res.status(404).send({
                status: "Resource not found.",
                message: "Invalid task ID.",
            });
            return;
        }
        const foundBoard = yield Board_1.Board.findById(boardId);
        if (!foundBoard) {
            res.status(404).send({
                status: "Resource not found.",
                message: "Invalid board ID.",
            });
            return;
        }
        foundTask.deleteOne();
        foundBoard[foundTask.status] = foundBoard[foundTask.status].filter((id) => id.toString() != taskId);
        yield foundBoard.save();
        yield foundTask.save();
        res.status(204);
        return;
    }
    catch (err) {
        next(err);
    }
});
exports.deleteTask = deleteTask;
