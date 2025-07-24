import { NextFunction, Request, Response } from "express";
import { handler } from "../../utils/asyncUtils";
import { sendResponse } from "../../utils/responseUtil";
import { StatusCodes } from "http-status-codes";
import { PServices } from "./payment.service";

const handleSuccessPayment = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId } = req.query;
    console.log("Req Params :", req.query);
    console.log("Req Body :", req.body);
    const success_service_response = PServices.payment_success_service(
      transactionId as string
    );
    sendResponse(res, {
      success: (await success_service_response).status,
      statusCode: StatusCodes.OK,
      message: (await success_service_response).message,
      data: "",
    });
  }
);
const handleFailedPayment = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId } = req.query;

    const success_service_response = PServices.payment_fail_service(
      transactionId as string
    );
    sendResponse(res, {
      success: (await success_service_response).status,
      statusCode: StatusCodes.OK,
      message: (await success_service_response).message,
      data: "",
    });
  }
);

const handleCancelPayment = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId } = req.query;

    const success_service_response = PServices.payment_cancel_service(
      transactionId as string
    );
    sendResponse(res, {
      success: (await success_service_response).status,
      statusCode: StatusCodes.OK,
      message: (await success_service_response).message,
      data: "",
    });
  }
);
const handleOldBooking = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookingID = req.params;
    console.log("Booking controller:", bookingID);

    const success_service_response = await PServices.payment_oldBooking_service(
      bookingID as Record<string, string>
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "(await success_service_response).message,",
      data: success_service_response.payment_gateway_URL,
    });
  }
);
export const PaymentController = {
  handleSuccessPayment,
  handleFailedPayment,
  handleCancelPayment,
  handleOldBooking,
};
