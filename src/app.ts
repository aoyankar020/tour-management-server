import express, { Application, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalError } from "./app/middleware/globalError";
import { notFoundHandler } from "./app/middleware/notFound";
import cookieParser from "cookie-parser";

export const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Basic Folder Setup..;");
});

app.use(globalError);
app.use(notFoundHandler.notFound);
