import express from "express";
import { userRouter } from "../modules/user/routes.user";
import { authRoutes } from "../modules/auth/auth.routes";
import { divisionRouter } from "../modules/division/routes.division";
import { TourRoutes } from "../modules/tour/route.tour";
import { bookingRouter } from "../modules/booking/booking.rout";
import { paymentRouter } from "../modules/payment/payment.routes";

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
  {
    path: "/division",
    routes: divisionRouter,
  },
  {
    path: "/tour",
    routes: TourRoutes,
  },
  {
    path: "/booking",
    routes: bookingRouter,
  },
  {
    path: "/payment",
    routes: paymentRouter,
  },
];

modulesRoutes.forEach((route) => {
  if (route.path) {
    router.use(route.path, route.routes);
  }
});
