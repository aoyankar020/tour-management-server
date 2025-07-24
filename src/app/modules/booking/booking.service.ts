import { date } from "zod";
import { IPayment, PStatus } from "../payment/payment.interface";

import { User } from "../user/model.user";
import { bookingStatus, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Tour } from "../tour/model.tour";
import { sslINIT } from "../sslcommerz/ssl.Init";
import { IUser } from "../user/interface.user";
import { ISSL } from "../sslcommerz/ssl.interface";
import { Payment } from "../payment/payment.model";
const getTransactionID = () => {
  return `tran_${Date.now()}_${Math.floor(Math.random()) * 1000}`;
};
const createBookingService = async (
  payload: Partial<IBooking>,
  userID: string
) => {
  const transactionID = getTransactionID();

  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const cost = await Tour.findById(payload.tour).select("costFrom");

    if (!cost?.costFrom) {
      return new Error("Please Update your Profile");
    }
    const paymentAmmount = Number(cost.costFrom) * Number(payload.guestCount);
    const user = await User.findById(userID);
    if (!user?.phone && !user?.address) {
      return new Error("Please Update your Profile");
    }
    const savedData = await Booking.create(
      [
        {
          user: userID,
          status: bookingStatus.PENDING,
          ...payload,
        },
      ],
      { session }
    );
    const bookingPayment = await Payment.create(
      [
        {
          booking: savedData[0]._id,
          status: PStatus.UNPAID,
          transactionId: transactionID,
          ammount: paymentAmmount,
        },
      ],
      { session }
    );
    const updatedBooking = await Booking.findByIdAndUpdate(
      savedData[0]._id,
      { payment: bookingPayment[0]._id },
      { new: true, runValidators: true, session }
    )
      .populate<{ payment: IPayment }>("payment")
      .populate<{ user: IUser }>("user");

    const { name, email, phone, address } = updatedBooking?.user as IUser;
    const { ammount, transactionId } = updatedBooking?.payment as IPayment;

    const sslPayload: ISSL = {
      name: name,
      email: email,
      phone: phone as string,
      address: address as string,
      ammount: ammount,
      transactionId: transactionId,
    };
    const sslPayment = await sslINIT(sslPayload);

    await session.commitTransaction();
    session.endSession();
    return {
      payment_gateway_URL: sslPayment.payment_URL,
      UBooking: updatedBooking,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const getBookingsService = () => {};
const getBookingByIDService = () => {};
const getUserBookingService = () => {};
const deleteBookingService = () => {};
const updateBookingService = () => {};

export const bookingServices = {
  createBookingService,
  getBookingsService,
  getBookingByIDService,
  getUserBookingService,
  deleteBookingService,
  updateBookingService,
};
