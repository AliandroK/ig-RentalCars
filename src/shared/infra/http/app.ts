import express, { NextFunction, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";

import "express-async-errors";
import { myDataSource } from "@shared/infra/typeorm/";

import "../../container";
import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import { router } from "./routes";

myDataSource.initialize();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
