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
exports.getBoardById = exports.getAllBoards = void 0;
const User_1 = require("../../models/auth/User");
const Board_1 = require("../../models/kanban/Board");
const getAllBoards = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { auth } = req.body;
    console.log(auth);
    try {
        const doc = yield User_1.User.findById(auth === null || auth === void 0 ? void 0 : auth.id).populate({
            path: "boards",
            select: ["_id", "title"],
        });
        console.log(doc);
        res.send({
            uid: doc === null || doc === void 0 ? void 0 : doc._id,
            username: doc === null || doc === void 0 ? void 0 : doc.username,
            email: doc === null || doc === void 0 ? void 0 : doc.email,
            boards: doc === null || doc === void 0 ? void 0 : doc.boards,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Internal server error.",
            message: "An error occured. Please try again.",
        });
    }
});
exports.getAllBoards = getAllBoards;
const getBoardById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    try {
        const doc = yield Board_1.Board.findById(id);
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
            done: doc === null || doc === void 0 ? void 0 : doc.todo,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Internal server error.",
            message: "An error occured. Please try again.",
        });
    }
});
exports.getBoardById = getBoardById;
