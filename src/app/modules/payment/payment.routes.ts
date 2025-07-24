import { Router } from "express";
import { PaymentController } from "./payment.controller";

export const paymentRouter = Router();
paymentRouter.post("/success", PaymentController.handleSuccessPayment);
paymentRouter.post("/fail", PaymentController.handleFailedPayment);
paymentRouter.post("/cancel", PaymentController.handleCancelPayment);
paymentRouter.post("/:paymentID", PaymentController.handleOldBooking);
