import { NextFunction, Request, Response } from "express";
import { User } from "./model.user";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { userServices } from "./service.user";
import { handler } from "../../utils/asyncUtils";
import { sendResponse } from "../../utils/responseUtil";

const createUser = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    const user = userServices.createUserService(userData);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  }
);

const getUsers = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userServices.getUsers();
    sendResponse(res, {
      data: users.users,
      statusCode: StatusCodes.OK,
      success: true,
      message: "Users Retrieved Successfully",
      meta: { total: users.Total },
    });
  }
);

export const userController = { createUser, getUsers };
