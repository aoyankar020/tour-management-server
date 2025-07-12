import express from "express";
import { userController } from "./controller.user";

export const userRouter = express.Router();

userRouter.post("/register", userController.createUser);
userRouter.get("/users", userController.getUsers);
