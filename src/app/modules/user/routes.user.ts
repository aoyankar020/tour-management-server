import express, { NextFunction, Request, Response } from "express";
import { userController } from "./controller.user";

import { userCreateZodSchema } from "./validation.user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { validateUser } from "../../middleware/validateRequest";
import { ROLE } from "./interface.user";
import { verifyToken } from "../../middleware/jwt";
import { envVars } from "../../config/config";
import { checkAuthentication } from "../../middleware/checkAuth";

export const userRouter = express.Router();

userRouter.post(
  "/register",
  validateUser(userCreateZodSchema),
  userController.createUser
);

userRouter.get(
  "/users",
  checkAuthentication(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  userController.getUsers
);
