import { NextFunction, Request, Response } from "express";
import { User } from "./model.user";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { userServices } from "./service.user";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new Error("This is a test error for global error handling");
    const userData = req.body;
    const user = userServices.createUserService(userData);
    res.status(StatusCodes.CREATED).send({
      status: ReasonPhrases.CREATED,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = { createUser };
