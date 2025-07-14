import { Response } from "express";
import { envVars } from "../config/config";
interface ITokens {
  accessToken?: string;
  refreshToken?: string;
}
export const setCookies = (res: Response, tokenType: ITokens) => {
  if (tokenType.accessToken) {
    res.cookie("accessToken", tokenType.accessToken, {
      httpOnly: true,
      secure: false,
    });
  }
  if (tokenType.refreshToken) {
    res.cookie("refreshToken", tokenType.refreshToken, {
      httpOnly: true,
      secure: false,
    });
  }
};
