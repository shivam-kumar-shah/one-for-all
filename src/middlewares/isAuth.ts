import { RequestHandler } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { AppReqBody } from "../models/util/AppReqBody";

export const isAuth: RequestHandler<
  unknown,
  unknown,
  AppReqBody,
  unknown
> = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).send({
      status: "Bad Request",
      message:
        "Auth Error. Provide access token under 'Authorization' header of the request.",
    });
    return;
  }
  try {
    const { email, id, username } = verify(
      token,
      process.env.JWT_SECRET
    ) as JwtPayload;
    req.body.auth = {
      email,
      id,
      username,
    };
    next();
  } catch (err) {
    res.status(401).send({
      status: "Forbidden",
      message: "Auth Error. Invalid access token.",
    });
    return;
  }
};
