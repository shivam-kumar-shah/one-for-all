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
exports.signIn = exports.join = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../../models/auth/User");
const join = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    if (!(email && password && username)) {
        res.status(400).send({
            status: "Bad Request",
            message: "Missing fields in body.",
        });
        return;
    }
    try {
        const foundUser = yield User_1.User.findOne({ email });
        if (foundUser) {
            res.status(409).send({
                status: "Resource conflict",
                message: "User exists already. Try signing in.",
            });
            return;
        }
        const hashedPassword = yield (0, bcrypt_1.hash)(password, +process.env.HASH_SECRET);
        const newUser = new User_1.User({
            email,
            username,
            hashedPassword,
        });
        yield newUser.save();
        const userToken = {
            id: newUser._id.toString(),
            email,
            username,
        };
        res.status(201).send({
            status: "Resource allocated.",
            message: "User created successfully.",
            access_token: (0, jsonwebtoken_1.sign)(userToken, process.env.JWT_SECRET),
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Internal server error.",
            message: "An error occured. Please try again.",
        });
    }
});
exports.join = join;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send({
            status: "Bad Request",
            message: "Missing fields in body.",
        });
        return;
    }
    try {
        const foundUser = yield User_1.User.findOne({ email });
        if (!foundUser) {
            res.status(404).send({
                status: "Resource not found.",
                message: "User not found. Try signing up.",
            });
            return;
        }
        const isValid = yield (0, bcrypt_1.compare)(password, foundUser.hashedPassword);
        if (!isValid) {
            res.status(403).send({
                status: "Forbidden.",
                message: "Auth Error. Invalid user.",
            });
            return;
        }
        const userToken = {
            id: foundUser._id.toString(),
            email,
            username: foundUser.username,
        };
        res.status(200).send({
            status: "Success.",
            message: "Signed in successfully.",
            access_token: (0, jsonwebtoken_1.sign)(userToken, process.env.JWT_SECRET),
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Internal server error.",
            message: "An error occured. Please try again.",
        });
    }
});
exports.signIn = signIn;
