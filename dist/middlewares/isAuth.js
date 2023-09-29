"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        res.status(400).send({
            status: "Bad Request",
            message: "Auth Error. Provide access token under 'Authorization' header of the request.",
        });
        return;
    }
    try {
        const { email, id, username } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.body.payload = req.body;
        req.body.auth = {
            email,
            id,
            username,
        };
        next();
    }
    catch (err) {
        res.status(401).send({
            status: "Forbidden",
            message: "Auth Error. Invalid access token.",
        });
        return;
    }
});
exports.isAuth = isAuth;
