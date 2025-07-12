import { NextFunction, Request, Response } from "express";
import { User } from "./model.user";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { userServices } from "./service.user";
import { handler } from "../../utils/asyncUtils";

const createUser = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    const user = userServices.createUserService(userData);
    res.status(StatusCodes.CREATED).send({
      status: ReasonPhrases.CREATED,
      message: "User Created Successfully",
      user,
    });
  }
);

const getUsers = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userServices.getUsers();
    res.status(StatusCodes.OK).send({
      status: ReasonPhrases.OK,
      message: "Users Retrieved Successfully",
      users,
    });
  }
);

export const userController = { createUser, getUsers };
