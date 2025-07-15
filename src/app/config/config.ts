import dotenv from "dotenv";
dotenv.config();

interface IEnvconfig {
  NODE_ENV: "development" | "production";
  PORT: string;
  DATABASE_URL: string;
  JWT_EXPIRED: string;
  JWT_SECRET: string;
  HASH_SALT: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  CALLBACK_URL: string;
  Authorization_Origin_URL: string;
  EXPRESS_SESSION_SECRET: string;
  FRONT_URL: string;
}

const loadEnvVariables = (): IEnvconfig => {
  const envVariables: string[] = [
    "NODE_ENV",
    "PORT",
    "DATABASE_URL",
    "JWT_SECRET",
    "JWT_EXPIRED",
    "HASH_SALT",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "CALLBACK_URL",
    "Authorization_Origin_URL",
    "EXPRESS_SESSION_SECRET",
    "FRONT_URL",
  ];

  envVariables.map((key) => {
    if (!process.env[key]) {
      throw new Error(`Required Environment Variable Missing: ${key}  `);
    }
  });

  return {
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    JWT_EXPIRED: process.env.JWT_EXPIRED as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    HASH_SALT: process.env.HASH_SALT as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    CALLBACK_URL: process.env.CALLBACK_URL as string,
    Authorization_Origin_URL: process.env.Authorization_Origin_URL as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    FRONT_URL: process.env.FRONT_URL as string,
  };
};

export const envVars: IEnvconfig = loadEnvVariables();
