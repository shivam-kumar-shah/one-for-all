import { UserInterface } from "../auth/User";
import {} from "express";
import { Status } from "../kanban/Board";
import { TaskInterface } from "../kanban/Task";

export interface UserToken {
  id: string;
  email: string;
  username: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  username: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface PostBoardPayload {
  title: string;
}

export interface PostTaskPayload {
  id: string;
  title: string;
  status?: Status;
  subtasks: { title: string; isDone?: boolean }[];
}

export interface EditBoardPayload {
  id: string;
  title: string;
}

export interface EditTaskPayload {
  id: string;
  title: string;
  subtasks: {
    title: string;
    isDone: boolean;
  }[];
  status?: Status;
}
export interface AddSubTaskPayload {
  id: string;
  title: string;
  isDone?: boolean;
}

export interface DeleteTaskPayload {
  id: string;
  boardId: string;
}

export interface DeleteBoardPayload {
  id: string;
}

export interface AppReqBody<T = {}> {
  auth: UserToken;
  payload: T;
}
