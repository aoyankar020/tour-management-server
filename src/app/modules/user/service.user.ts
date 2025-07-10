import { IUser } from "./interface.user";
import { User } from "./model.user";

export const createUserService = async (payload: Partial<IUser>) => {
  const user = await User.create(payload);
  return user;
};

export const userServices = { createUserService };
