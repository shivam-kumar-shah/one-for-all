import "dotenv/config";
import express from "express";
import { connectToDB } from "./config/database";

const app = express();

connectToDB(() =>
  app.listen(3000, () => {
    console.log("Server started on: https://localhost:3000/");
  })
);
