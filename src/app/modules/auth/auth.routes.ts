import express from "express";

import { authControllers } from "./auth.controller";
export const authRoutes = express.Router();

authRoutes.post("/login", authControllers.loggedInController);
authRoutes.post("/refresh-token", authControllers.getNewTokenController);
authRoutes.post("/logout", authControllers.logout);
