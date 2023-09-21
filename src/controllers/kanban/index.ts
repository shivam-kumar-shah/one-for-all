import { RequestHandler } from "express";
import { User, UserInterface } from "../../models/auth/User";
import { Board } from "../../models/kanban/Board";
import { AppReqBody } from "../../models/util/AppReqBody";

export const getAllBoards: RequestHandler<
  unknown,
  unknown,
  AppReqBody,
  unknown
> = async (req, res, next) => {
  const { auth } = req.body;
  console.log(auth);
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Internal server error.",
      message: "An error occured. Please try again.",
    });
  }
};

export const getBoardById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const doc = await Board.findById(id);
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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Internal server error.",
      message: "An error occured. Please try again.",
    });
  }
};
