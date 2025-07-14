import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/responseUtil";
import { handler } from "../../utils/asyncUtils";
import { authServices } from "./auth.service";

import { setCookies } from "../../utils/setCookies";

export const loggedInController = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const tokenType = await authServices.credentialsCheckingService(req.body);

    if (!tokenType) {
      res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).json({
        StatusCodes: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message: "Invalid credentials",
      });
    }
    setCookies(res, tokenType);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Successfully Logoged In",
      data: tokenType,
    });
  }
);

const getNewTokenController = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = await req.cookies.refreshToken;

    const newTokenInfo = await authServices.getNewAccessToken(refreshToken);

    if (!newTokenInfo) {
      res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).json({
        StatusCodes: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
        success: false,
        message: "Refresh Token not valid",
      });
    }
    setCookies(res, newTokenInfo);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Access Token generated Successfully",
      data: newTokenInfo,
    });
  }
);

const logout = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User Logoged Out Successfully",
      data: null,
    });
  }
);

export const authControllers = {
  loggedInController,
  getNewTokenController,
  logout,
};
