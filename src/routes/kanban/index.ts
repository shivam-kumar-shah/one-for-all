import { Router } from "express";
import {
  addSubTask,
  deleteBoard,
  deleteTask,
  editBoard,
  editTask,
  getAllBoards,
  getBoardById,
  postBoard,
  postTask,
} from "../../controllers/kanban";
import { isAuth } from "../../middlewares/isAuth";

const router = Router();

router.get("/", isAuth, getAllBoards);
router.get("/:id", isAuth, getBoardById);

router.post("/board", isAuth, postBoard);
router.post("/task", isAuth, postTask);

router.patch("/board/edit", isAuth, editBoard);
router.patch("/task/add", isAuth, addSubTask);

router.put("/task/edit", isAuth, editTask);

router.delete("/board", isAuth, deleteBoard);
router.delete("/task", isAuth, deleteTask);

export default router;
