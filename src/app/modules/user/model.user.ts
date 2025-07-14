import { model, Schema } from "mongoose";
import { IProviders, ISACTIVE, IUser, ROLE } from "./interface.user";

export const authSchema = new Schema<IProviders>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  {
    timestamps: false,
    versionKey: false,
    _id: false,
  }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    address: { type: String },
    phone: { type: String },
    isDeleted: { type: Boolean, default: false },
    picture: { type: String },
    isVerified: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: Object.values(ISACTIVE),
      default: ISACTIVE.ACTIVE,
    },
    role: { type: String, enum: Object.values(ROLE), default: ROLE.USER },
    bookings: { type: [Schema.ObjectId] },
    auths: { type: [authSchema] },
    guides: { type: [Schema.ObjectId] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const User = model<IUser>("users", userSchema);
