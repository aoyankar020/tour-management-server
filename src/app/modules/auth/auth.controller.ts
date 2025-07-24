import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/responseUtil";
import { handler } from "../../utils/asyncUtils";
import { authServices } from "./auth.service";

import { setCookies } from "../../utils/setCookies";
import { getTokens } from "../../utils/generateTokens";
import { envVars } from "../../config/config";
import passport from "passport";

export const loggedInController = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      async (err: any, user: any, info: any, status: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new Error(info.message));
        }
        const tokens = getTokens(user);
        if (!tokens) {
          return next(new Error("Token not generated"));
        }
        setCookies(res, {
          accessToken: tokens.jwt_access_token,
          refreshToken: tokens.jwt_refreshToken,
        });
        sendResponse(res, {
          statusCode: StatusCodes.CREATED,
          success: true,
          message: "Successfully Logoged In",
          data: {
            accessToken: tokens.jwt_access_token,
            refreshToken: tokens.jwt_refreshToken,
            user: user,
          },
        });
      }
    )(req, res, next);
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
const resetPasswordController = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    if (!decodedToken) {
      return sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Decoded Token not found",
        data: null,
      });
    }

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;

    authServices.getResetPasswordService(
      oldPassword,
      newPassword,
      decodedToken
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Password changed Successfully",
      data: null,
    });
  }
);
const GoogleCallbackController = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const User = req.user;
    const state_url = req.params.state || "";
    // Remove leading slash if it exists
    const redirectTo = state_url.startsWith("/")
      ? state_url.slice(1)
      : state_url;

    if (!User) {
      return sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "User Not Found",
        data: null,
      });
    }
    console.log("Google callback User: ", User);
    const tokens = getTokens(User);
    setCookies(res, {
      accessToken: tokens.jwt_access_token,
      refreshToken: tokens.jwt_refreshToken,
    });

    // sendResponse(res, {
    //   statusCode: StatusCodes.OK,
    //   success: true,
    //   message: "Google Call Back",
    //   data: null,
    // });

    res.redirect(`${envVars.FRONT_URL} /${redirectTo}`);
  }
);

export const authControllers = {
  loggedInController,
  getNewTokenController,
  logout,
  resetPasswordController,
  GoogleCallbackController,
};
