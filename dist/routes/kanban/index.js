"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const kanban_1 = require("../../controllers/kanban");
const isAuth_1 = require("../../middlewares/isAuth");
const router = (0, express_1.Router)();
router.get("/", isAuth_1.isAuth, kanban_1.getAllBoards);
router.get("/:id", isAuth_1.isAuth, kanban_1.getBoardById);
exports.default = router;
