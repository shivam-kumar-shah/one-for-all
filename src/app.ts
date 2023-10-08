import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";

import { connectToDB } from "./config/database";
import authRouter from "./routes/auth";
import kanbanRouter from "./routes/kanban";
import { errorHandler } from "./config/error";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/kanban", kanbanRouter);

app.use(errorHandler);

connectToDB(() =>
  app.listen(3000, () => {
    console.log("Server started on: http://localhost:3000/");
  })
);
