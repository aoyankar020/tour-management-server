import bcrypt from "bcryptjs";
import { ISACTIVE, IUser } from "../user/interface.user";
import { User } from "../user/model.user";

import { getTokens } from "../../utils/generateTokens";
import { envVars } from "../../config/config";
import { sendResponse } from "../../utils/responseUtil";
import { StatusCodes } from "http-status-codes";
import { generateToken, verifyToken } from "../../middleware/jwt";
import { JwtPayload } from "jsonwebtoken";
import { getNewAccessTokenByRefreshToken } from "../../utils/newAccessTokenByRefreshToken";

const credentialsCheckingService = async (payload: Partial<IUser>) => {
  // 1: user send me login credentials
  // 2: based on email checking the user exist on that db or not
  // 3: checking db hashed password matched with user supplied credentials or not
  // 4: check email and password matcher or not
  // 5: if credentials matched with db data then send access token and refresh token with user information as response

  const { email, password, ...rest } = payload;
  const user = await User.findOne({ email }).lean();
  if (!user) {
    throw new Error("Email not found");
  }
  const hashPassword = await bcrypt.compare(
    password as string,
    user.password as string
  );
  if (!hashPassword) {
    throw new Error("Password is incorrect");
  }
  const tokens = getTokens(user);
  delete user.password;
  return {
    accessToken: tokens.jwt_access_token,
    refreshToken: tokens.jwt_refreshToken,
    user: user,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = getNewAccessTokenByRefreshToken(refreshToken);
  return newAccessToken;
};
const getResetPasswordService = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  console.log(" Auth Service Decoded Token :", decodedToken);
  const user = await User.findOne({ email: decodedToken.email });

  if (!user) {
  }
  const isMatched = await bcrypt.compare(oldPassword, user!.password as string);
  if (!isMatched) {
    return new Error("Your Old Password is Not Correct");
  }
  user!.password = await bcrypt.hash(newPassword, Number(envVars.HASH_SALT));
  user!.save();
};

export const authServices = {
  credentialsCheckingService,
  getNewAccessToken,
  getResetPasswordService,
};
