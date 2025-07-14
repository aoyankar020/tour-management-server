import express from "express";
import { userRouter } from "../modules/user/routes.user";
import { authRoutes } from "../modules/auth/auth.routes";

export const router = express.Router();

const modulesRoutes = [
  {
    path: "/user",
    routes: userRouter,
  },
  {
    path: "/auth",
    routes: authRoutes,
  },
];

modulesRoutes.forEach((route) => {
  if (route.path) {
    router.use(route.path, route.routes);
  }
});
