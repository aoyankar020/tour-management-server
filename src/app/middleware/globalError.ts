import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { envVars } from "../config/config";

export const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    success: false,
    message: "Something went wrong!",
    error: err.message || "Internal Server Error",
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
