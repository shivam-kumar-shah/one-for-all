import { Router } from "express";
import { getAllBoards, getBoardById } from "../../controllers/kanban";
import { isAuth } from "../../middlewares/isAuth";

const router = Router();

router.get("/", isAuth, getAllBoards);
router.get("/:id", isAuth, getBoardById);

export default router;
