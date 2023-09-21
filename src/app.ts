import "dotenv/config";
import express from "express";
import { connectToDB } from "./config/database";
import authRouter from "./routes/auth";
import kanbanRouter from "./routes/kanban";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/kanban", kanbanRouter);

connectToDB(() =>
  app.listen(3000, () => {
    console.log("Server started on: http://localhost:3000/");
  })
);
