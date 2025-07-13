import { IProviders, IUser } from "./interface.user";
import { User } from "./model.user";
import bcrypt from "bcryptjs";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isEmailExists = await User.find({ email });
  if (isEmailExists.length > 0) {
    throw new Error("User already exists with this email");
  }
  const hashPassword = await bcrypt.hash(password as string, 10);
  if (!hashPassword) {
    throw new Error("Failed to hash password");
  }
  const authProvider: IProviders = {
    provider: "credential",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    auths: [authProvider],
    password: hashPassword,
    ...rest,
  });
  return user;
};
const getUsers = async () => {
  const users = await User.find();
  const totalUsers = await User.countDocuments();

  return {
    users,
    Total: totalUsers,
  };
};

export const userServices = { createUserService, getUsers };
