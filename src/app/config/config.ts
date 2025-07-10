import dotenv from "dotenv";
dotenv.config();

interface IEnvconfig {
  NODE_ENV: "development" | "production";
  PORT: string;
  DATABASE_URL: string;
}

const loadEnvVariables = (): IEnvconfig => {
  const envVariables: string[] = ["NODE_ENV", "PORT", "DATABASE_URL"];

  envVariables.map((key) => {
    if (!process.env[key]) {
      throw new Error(`Required Environment Variable Missing: ${key}  `);
    }
  });

  return {
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
  };
};

export const envVars: IEnvconfig = loadEnvVariables();

// ================== process One =================
// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({ path: path.join(process.cwd(), ".env") });
// export default {
//   node_env: process.env.NODE_ENV || "",
//   port: process.env.DB_PORT || 5000,
//   database_url: process.env.DATABASE_URL || "",
// };
