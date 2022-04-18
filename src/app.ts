import cors from "cors";
import express, { json, NextFunction, Request, Response } from "express";
import "express-async-errors";
import defaultRouter from "./routers/defaultRoute.js";

const app = express();
app.use(json());
app.use(cors());
app.use(defaultRouter);
app.use((error, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error.response) {
    return res.sendStatus(error.response.status);
  }

  res.sendStatus(500);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Running on " + PORT);
})