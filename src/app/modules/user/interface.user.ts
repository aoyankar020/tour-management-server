import { Types } from "mongoose";

export enum ROLE {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}
export enum ISACTIVE {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}
export interface IProviders {
  provider: string;
  providerId: string;
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: ISACTIVE;
  isVerified?: boolean;

  role: ROLE;
  auths: IProviders[];
  bookings?: Types.ObjectId[];
  gudes?: Types.ObjectId[];
}
