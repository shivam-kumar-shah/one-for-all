import { compare, hash } from "bcrypt";
import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";
import {
  AppReqBody,
  SignInPayload,
  SignUpPayload,
  UserToken,
} from "../../models/util/AppReqBody";
import { User } from "../../models/auth/User";

export const join: RequestHandler<
  unknown,
  unknown,
  SignUpPayload,
  unknown
> = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!(email && password && username)) {
      res.status(400).send({
        status: "Bad Request",
        message: "Missing fields in body.",
      });
      return;
    }
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(409).send({
        status: "Resource conflict",
        message: "User exists already. Try signing in.",
      });
      return;
    }
    const hashedPassword = await hash(password, +process.env.HASH_SECRET);
    const newUser = new User({
      email,
      username,
      hashedPassword,
    });
    await newUser.save();
    const userToken: UserToken = {
      id: newUser._id.toString(),
      email,
      username,
    };
    res.status(201).send({
      status: "Resource allocated.",
      message: "User created successfully.",
      username: newUser.username,
      email: newUser.email,
      access_token: sign(userToken, process.env.JWT_SECRET),
    });
  } catch (err) {
    next(err);
  }
};

export const signIn: RequestHandler<
  unknown,
  unknown,
  SignInPayload,
  unknown
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send({
        status: "Bad Request",
        message: "Missing fields in body.",
      });
      return;
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(404).send({
        status: "Resource not found.",
        message: "User not found. Try signing up.",
      });
      return;
    }
    const isValid = await compare(password, foundUser.hashedPassword);
    if (!isValid) {
      res.status(403).send({
        status: "Forbidden.",
        message: "Auth Error. Invalid user.",
      });
      return;
    }
    const userToken: UserToken = {
      id: foundUser._id.toString(),
      email,
      username: foundUser.username,
    };
    res.status(200).send({
      status: "Success.",
      message: "Signed in successfully.",
      username: foundUser.username,
      email: foundUser.email,
      access_token: sign(userToken, process.env.JWT_SECRET),
    });
  } catch (err) {
    next(err);
  }
};
