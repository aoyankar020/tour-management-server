import express, { Application, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalError } from "./app/middleware/globalError";
import { notFoundHandler } from "./app/middleware/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import { envVars } from "./app/config/config";
import "./app/config/passportconfig";

export const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Basic Folder Setup..;");
});

app.use(globalError);
app.use(notFoundHandler.notFound);
