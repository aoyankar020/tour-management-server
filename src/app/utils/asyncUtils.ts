import { NextFunction, Request, Response } from "express";

type AsyncType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

// Receving a fucntion type AsyncType and returning a function that handles async errors
// This is a higher-order function that wraps the async function to catch errors
const handleAsynce =
  (fn: AsyncType) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log("Error caught in async handler:", error);
      next(error);
    });
  };

export const handler = { handleAsynce };
