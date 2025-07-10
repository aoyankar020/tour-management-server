import express from "express";
import { userRouter } from "../modules/user/routes.user";

export const router = express.Router();

const modulesRoutes = [
  {
    path: "/user",
    routes: userRouter,
  },
];

modulesRoutes.forEach((route) => {
  if (route.path) {
    router.use(route.path, route.routes);
  }
});
