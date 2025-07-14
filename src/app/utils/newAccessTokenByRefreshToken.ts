import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/config";
import { generateToken, verifyToken } from "../middleware/jwt";
import { User } from "../modules/user/model.user";
import { ISACTIVE } from "../modules/user/interface.user";

export const getNewAccessTokenByRefreshToken = async (refreshToken: string) => {
  const isValidRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;

  const isUserExist = await User.findOne({ email: isValidRefreshToken.email });
  if (!isUserExist) {
    throw new Error("This user does not exist");
  }
  if (isUserExist.isDeleted) {
    throw new Error("This user is Deleted");
  }
  if (
    isUserExist.isActive === ISACTIVE.INACTIVE ||
    isUserExist.isActive == ISACTIVE.BLOCKED
  ) {
    throw new Error(`This user is ${isUserExist.isActive}`);
  }
  const payload = {
    email: isUserExist.email,
    name: isUserExist.name,
    phone: isUserExist.phone,
    address: isUserExist.address,
    role: isUserExist.role,
  };
  const newToken = generateToken(
    payload,
    envVars.JWT_SECRET,
    envVars.JWT_EXPIRED
  );
  return { accessToken: newToken };
};
