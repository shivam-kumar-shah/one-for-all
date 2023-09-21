import { UserInterface } from "../auth/User";
import {} from "express";

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

export interface AppReqBody<T = {}> {
  auth?: UserToken;
  payload: T;
}
