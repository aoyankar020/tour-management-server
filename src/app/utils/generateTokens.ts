import { envVars } from "../config/config";
import { generateToken } from "../middleware/jwt";
import { IUser } from "../modules/user/interface.user";

export const getTokens = (user: Partial<IUser>) => {
  const payload = {
    email: user.email,
    name: user.name,
    phone: user.phone,
    address: user.address,
    role: user.role,
  };
  const jwt_token = generateToken(
    payload,
    envVars.JWT_SECRET,
    envVars.JWT_EXPIRED
  );
  const jwt_refreshToken = generateToken(
    payload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );
  return { jwt_token, jwt_refreshToken };
};
