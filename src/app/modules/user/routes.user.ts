import express, { NextFunction, Request, Response } from "express";
import { userController } from "./controller.user";

import { userCreateZodSchema } from "./validation.user";
import { ZodObject } from "zod";
import { validateUser } from "../../middleware/validateRequest";

export const userRouter = express.Router();

userRouter.post(
  "/register",
  validateUser(userCreateZodSchema),
  userController.createUser
);
userRouter.get("/users", userController.getUsers);
