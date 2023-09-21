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
  title: string;
  status?: Status;
}

export interface EditTaskPayload {
  title: string;
  subtasks: {
    title: string;
    isDone: boolean;
  }[];
  status?: Status;
}

export interface AppReqBody<T = {}> {
  auth?: UserToken;
  payload: T;
}
