import { Router } from "express";
import { bookingController } from "./booking.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createBookigSchema, updateBookigSchema } from "./validation.zod";
import { checkAuthentication } from "../../middleware/checkAuth";
import { ROLE } from "../user/interface.user";

export const bookingRouter = Router();

bookingRouter.post(
  "/",
  validateRequest(createBookigSchema),
  checkAuthentication(...Object.values(ROLE)),
  bookingController.createBooking
);
bookingRouter.get("/", bookingController.getBooking);
bookingRouter.get("/my-bookings", bookingController.getBooking);
bookingRouter.get("/:bookingid", bookingController.getBooking);

bookingRouter.patch(
  "/:bookingid/status",
  validateRequest(updateBookigSchema),
  bookingController.getBooking
);
