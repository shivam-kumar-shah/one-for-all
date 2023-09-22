"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.log(error);
    res.status(500).send({
        status: "Internal server error.",
        message: "An error occured. Please try again.",
    });
};
exports.errorHandler = errorHandler;
