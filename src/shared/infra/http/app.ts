import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

// import createConnection from "@shared/infra/typeorm";

import "../../../shared/container"
import { router } from "./routes";
import { AppError } from "../../../utils/AppError";

// createConnection();
const app = express();

app.use(express.json());

app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
