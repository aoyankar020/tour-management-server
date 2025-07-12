import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
};
export const notFoundHandler = {
  notFound,
};
