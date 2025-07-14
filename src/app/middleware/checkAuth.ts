import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./jwt";
import { envVars } from "../config/config";
import { JwtPayload } from "jsonwebtoken";

export const checkAuthentication =
  (...authRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: "Unauthorized",
        success: false,
        message: "No token provided",
      });
    }
    const isVarified = verifyToken(token, envVars.JWT_SECRET) as JwtPayload;
    if (!authRoles.includes(isVarified.role)) {
      return res.status(401).json({
        status: "You are not authorized to access this route",
        success: false,
        message: "Token verification failed",
      });
    }
    next();
  };
