import { IUser } from "./interface.user";
import { User } from "./model.user";

const createUserService = async (payload: Partial<IUser>) => {
  const user = await User.create(payload);
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
