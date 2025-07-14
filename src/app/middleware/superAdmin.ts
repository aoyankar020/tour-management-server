import en from "zod/v4/locales/en.cjs";
import { User } from "../modules/user/model.user";
import { envVars } from "../config/config";
import bycrypt from "bcryptjs";
import { IProviders, ISACTIVE, ROLE } from "../modules/user/interface.user";

export const seedSuperAdmin = async () => {
  const superAdmin = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL });
  if (superAdmin) {
    console.log("Super Admin already exists");
    return;
  }
  const hashedPassword = await bycrypt.hash(
    envVars.SUPER_ADMIN_PASSWORD,
    Number(envVars.HASH_SALT)
  );
  if (!hashedPassword) {
    throw new Error("Failed to hash super admin password");
  }
  const providers: IProviders = {
    provider: "credential",
    providerId: envVars.SUPER_ADMIN_EMAIL,
  };
  console.log("Creating Super Admin...");
  const newSuperAdmin = await User.create({
    email: envVars.SUPER_ADMIN_EMAIL,
    password: hashedPassword,
    role: ROLE.SUPER_ADMIN,
    name: "Super Admin",
    isActive: ISACTIVE.ACTIVE,
    isVerified: true,
    auths: [providers],
  });

  if (newSuperAdmin) {
    console.log("Super Admin created successfully:", newSuperAdmin);
  }
};
