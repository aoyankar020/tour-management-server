import express, { NextFunction, Request, Response } from "express";

import { authControllers } from "./auth.controller";
import { checkAuthentication } from "../../middleware/checkAuth";
import { ROLE } from "../user/interface.user";
import passport from "passport";
export const authRoutes = express.Router();

authRoutes.post("/login", authControllers.loggedInController);
authRoutes.post("/refresh-token", authControllers.getNewTokenController);
authRoutes.post("/logout", authControllers.logout);
authRoutes.post(
  "/reset-password",
  checkAuthentication(...Object.values(ROLE)),
  authControllers.resetPasswordController
);
authRoutes.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.params.redirect || "/";
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: redirect,
    })(req, res, next);
  }
);
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "/",
    failureRedirect: "/login",
  }),
  authControllers.GoogleCallbackController
);
