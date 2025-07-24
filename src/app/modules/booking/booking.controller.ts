import { NextFunction, Request, Response } from "express";
import { handler } from "../../utils/asyncUtils";
import { bookingServices } from "./booking.service";
import { sendResponse } from "../../utils/responseUtil";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/model.user";

const createBooking = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookingData = req.body;
    const decodedToken = req.user as JwtPayload;
    const user = await User.findOne({ email: decodedToken.email }).select(
      "_id"
    );
    console.log("DecodedToken:", decodedToken);
    console.log("UID:");
    if (!user || !user._id) {
      return sendResponse(res, {
        message: "User not found",
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        data: null,
      });
    }
    const result = await bookingServices.createBookingService(
      bookingData,
      user._id.toString()
    );
    console.log("Result", result);
    sendResponse(res, {
      message: "Booking created Successfully",
      statusCode: StatusCodes.CREATED,
      success: true,
      data: result,
    });
  }
);
const getBooking = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = bookingServices.getBookingsService();
    sendResponse(res, {
      message: "Booking created Successfully",
      statusCode: StatusCodes.CREATED,
      success: true,
      data: result,
    });
  }
);
const getSingleBooking = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = bookingServices.getBookingByIDService();
    sendResponse(res, {
      message: "Booking created Successfully",
      statusCode: StatusCodes.CREATED,
      success: true,
      data: result,
    });
  }
);
const getUserBooking = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = bookingServices.getUserBookingService();
    sendResponse(res, {
      message: "Booking created Successfully",
      statusCode: StatusCodes.CREATED,
      success: true,
      data: result,
    });
  }
);
const DeleteBooking = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = bookingServices.deleteBookingService();
    sendResponse(res, {
      message: "Booking created Successfully",
      statusCode: StatusCodes.CREATED,
      success: true,
      data: result,
    });
  }
);
const updateBooking = handler.handleAsynce(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = bookingServices.updateBookingService();
    sendResponse(res, {
      message: "Booking created Successfully",
      statusCode: StatusCodes.CREATED,
      success: true,
      data: result,
    });
  }
);

export const bookingController = {
  createBooking,
  getBooking,
  getSingleBooking,
  getUserBooking,
  updateBooking,
  DeleteBooking,
};
