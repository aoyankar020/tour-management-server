import { Request, Response } from "express";
import { User } from "./model.user";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { userServices } from "./service.user";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = userServices.createUserService(userData);
    res.status(StatusCodes.CREATED).send({
      status: ReasonPhrases.CREATED,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: "User creation Failed",
    });
  }
};

export const userController = { createUser };
