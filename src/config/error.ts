import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  res.status(500).send({
    status: "Internal server error.",
    message: "An error occured. Please try again.",
  });
};
