import { RequestHandler } from "express";
import { User, UserInterface } from "../../models/auth/User";
import { Board, Status } from "../../models/kanban/Board";
import {
  AddSubTaskPayload,
  AppReqBody,
  DeleteBoardPayload,
  DeleteTaskPayload,
  EditBoardPayload,
  EditTaskPayload,
  PostBoardPayload,
  PostTaskPayload,
} from "../../models/util/AppReqBody";
import { Task } from "../../models/kanban/Task";

export const getAllBoards: RequestHandler<
  unknown,
  unknown,
  AppReqBody,
  unknown
> = async (req, res, next) => {
  const { auth } = req.body;

  const doc = await User.findById(auth?.id).populate({
    path: "boards",
    select: ["_id", "title"],
  });
  res.send({
    uid: doc?._id,
    username: doc?.username,
    email: doc?.email,
    boards: doc?.boards,
  });
};

export const getBoardById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const doc = await Board.findById(id)
    .populate(Status.todo)
    .populate(Status.doing)
    .populate(Status.done);
  if (!doc) {
    res.status(403).send({
      status: "Forbidden.",
      message: "Auth Error. Invalid User.",
    });
    return;
  }
  res.send({
    uid: doc?.user?._id,
    id: doc?.id,
    todo: doc?.todo,
    doing: doc?.doing,
    done: doc?.todo,
  });
};

export const postBoard: RequestHandler<
  unknown,
  unknown,
  AppReqBody<PostBoardPayload>,
  unknown
> = async (req, res, next) => {
  const { title } = req.body.payload;
  const { id } = req.body.auth;
  const foundUser = await User.findById(id);
  if (!foundUser) {
    res.status(404).send({
      status: "Resource not found.",
      message: "User not found. Try signing up.",
    });
    return;
  }
  const newBoard = new Board({ title, user: foundUser });
  foundUser.boards.push(newBoard.id);
  await foundUser.save();
  await newBoard.save();
  res.status(201).send({
    status: "Resource created.",
    message: "Board created successfully.",
  });
};

export const postTask: RequestHandler<
  unknown,
  unknown,
  AppReqBody<PostTaskPayload>,
  unknown
> = async (req, res, next) => {
  const { title, id: boardId, status, subtasks } = req.body.payload;
  const { id } = req.body.auth;
  const foundUser = await User.findById(id);
  if (!foundUser) {
    res.status(404).send({
      status: "Resource not found.",
      message: "User not found. Try signing up.",
    });
    return;
  }
  const foundBoard = await Board.findById(boardId);
  if (!foundBoard) {
    res.status(404).send({
      status: "Resource not found.",
      message: "Invalid board ID.",
    });
    return;
  }
  const newTask = new Task({ title, status, subtasks });
  foundBoard[status ?? Status.todo].push(newTask.id);
  await foundBoard.save();
  await newTask.save();
  res.status(201).send({
    status: "Resource created.",
    message: "Board created successfully.",
  });
};

export const editBoard: RequestHandler<
  unknown,
  unknown,
  AppReqBody<EditBoardPayload>,
  unknown
> = async (req, res, next) => {
  const { title, id: boardId } = req.body.payload;
  const { id } = req.body.auth;
  const foundUser = await User.findById(id);
  if (!foundUser) {
    res.status(404).send({
      status: "Resource not found.",
      message: "User not found. Try signing up.",
    });
    return;
  }
  const foundBoard = await Board.findById(boardId);
  if (!foundBoard) {
    res.status(404).send({
      status: "Resource not found.",
      message: "Invalid board ID.",
    });
    return;
  }
  foundBoard.title = title;
  await foundBoard.save();
  res.status(204).send({
    status: "Resource updated.",
    message: "Board updated successfully.",
  });
};

export const editTask: RequestHandler<
  unknown,
  unknown,
  AppReqBody<EditTaskPayload>,
  unknown
> = async (req, res, next) => {
  const { id: taskId, title, subtasks, status } = req.body.payload;
  const { id } = req.body.auth;
  const foundUser = await User.findById(id);
  if (!foundUser) {
    res.status(404).send({
      status: "Resource not found.",
      message: "User not found. Try signing up.",
    });
    return;
  }
  const foundTask = await Task.findById(taskId);
  if (!foundTask) {
    res.status(404).send({
      status: "Resource not found.",
      message: "Invalid task ID.",
    });
    return;
  }
  foundTask.title = title;
  foundTask.status = status ?? Status.todo;
  foundTask.subtasks = subtasks;
  await foundTask.save();
  res.status(204).send({
    status: "Resource updated.",
    message: "Task updated successfully.",
  });
};

export const addSubTask: RequestHandler<
  unknown,
  unknown,
  AppReqBody<AddSubTaskPayload>,
  unknown
> = async (req, res, next) => {
  const { id: taskId, title, isDone } = req.body.payload;
  const { id } = req.body.auth;
  const foundUser = await User.findById(id);
  if (!foundUser) {
    res.status(404).send({
      status: "Resource not found.",
      message: "User not found. Try signing up.",
    });
    return;
  }
  const foundTask = await Task.findById(taskId);
  if (!foundTask) {
    res.status(404).send({
      status: "Resource not found.",
      message: "Invalid task ID.",
    });
    return;
  }
  foundTask.subtasks.push({
    title,
    isDone: isDone ?? false,
  });
  await foundTask.save();
  res.status(201).send({
    status: "Resource created.",
    message: "Subtask created successfully.",
  });
};

export const deleteBoard: RequestHandler<
  unknown,
  unknown,
  AppReqBody<DeleteBoardPayload>,
  unknown
> = async (req, res, next) => {
  const { id: boardId } = req.body.payload;
  const { id } = req.body.auth;
  const foundUser = await User.findById(id);
  if (!foundUser) {
    res.status(404).send({
      status: "Resource not found.",
      message: "User not found. Try signing up.",
    });
    return;
  }
  const foundBoard = await Board.findById(boardId);
  if (!foundBoard) {
    res.status(404).send({
      status: "Resource not found.",
      message: "Invalid board ID.",
    });
    return;
  }
  foundBoard.deleteOne();
  foundUser.boards = foundUser.boards.filter((id) => id.toString() != boardId);
  await foundBoard.save();
  await foundUser.save();
  res.status(204);
  return;
};

export const deleteTask: RequestHandler<
  unknown,
  unknown,
  AppReqBody<DeleteTaskPayload>,
  unknown
> = async (req, res, next) => {
  const { id: taskId, boardId } = req.body.payload;
  const { id } = req.body.auth;
  const foundUser = await User.findById(id);
  if (!foundUser) {
    res.status(404).send({
      status: "Resource not found.",
      message: "User not found. Try signing up.",
    });
    return;
  }
  const foundTask = await Task.findById(taskId);
  if (!foundTask) {
    res.status(404).send({
      status: "Resource not found.",
      message: "Invalid task ID.",
    });
    return;
  }
  const foundBoard = await Board.findById(boardId);
  if (!foundBoard) {
    res.status(404).send({
      status: "Resource not found.",
      message: "Invalid board ID.",
    });
    return;
  }
  foundTask.deleteOne();
  foundBoard[foundTask.status] = foundBoard[foundTask.status].filter(
    (id) => id.toString() != taskId
  );
  await foundBoard.save();
  await foundTask.save();
  res.status(204);
  return;
};
