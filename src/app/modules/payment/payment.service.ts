import { bookingStatus } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { sslINIT } from "../sslcommerz/ssl.Init";
import { ISSL } from "../sslcommerz/ssl.interface";
import { IUser } from "../user/interface.user";
import { IPayment, PStatus } from "./payment.interface";
import { Payment } from "./payment.model";
import { ObjectId } from "mongodb";

const payment_success_service = async (query: string) => {
  const session = await Booking.startSession();
  console.log("Session :", session);
  session.startTransaction();
  try {
    const payment = await Payment.findOneAndUpdate(
      { transactionId: query },
      {
        status: PStatus.PAID,
      },
      { new: true, runValidators: true, session }
    );
    await Booking.findByIdAndUpdate(
      { _id: payment?.booking },
      {
        status: bookingStatus.COMPLETE,
      },
      { new: true, runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return { status: true, message: "Payment Successfully" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const payment_fail_service = async (query: string) => {
  const session = await Booking.startSession();

  session.startTransaction();
  try {
    const payment = await Payment.findOneAndUpdate(
      { transactionId: query },
      {
        status: PStatus.FAILED,
      },
      { new: true, runValidators: true, session }
    );
    console.log("Payment ID:", payment);
    await Booking.findByIdAndUpdate(
      { _id: payment?.booking },
      {
        status: bookingStatus.FAILED,
      },
      { new: true, runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return { status: false, message: "Payment Failed" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const payment_cancel_service = async (query: string) => {
  const session = await Booking.startSession();

  session.startTransaction();
  try {
    const payment = await Payment.findOneAndUpdate(
      { transactionId: query },
      {
        status: PStatus.CANCELED,
      },
      { new: true, runValidators: true, session }
    );
    await Booking.findByIdAndUpdate(
      { _id: payment?.booking },
      {
        status: bookingStatus.CANCLE,
      },
      { new: true, runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return { status: false, message: "Payment Cancelled" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const payment_oldBooking_service = async (
  bookingid: Record<string, string>
) => {
  const session = Booking.startSession();
  (await session).startTransaction();
  try {
    const result = await Booking.findById({ _id: bookingid.paymentID })
      .populate<{ payment: IPayment }>("payment")
      .populate<{ user: IUser }>("user");
    const { name, email, phone, address } = result?.user as IUser;
    const { ammount, transactionId } = result?.payment as IPayment;
    const sslPayload: ISSL = {
      name: name,
      email: email,
      phone: phone as string,
      address: address as string,
      ammount: ammount,
      transactionId: transactionId,
    };
    const { payment_URL } = await sslINIT(sslPayload);
    console.log("SSL GAteway :", payment_URL);

    return {
      status: true,
      message: "Booking findout Successfully",
      payment_gateway_URL: payment_URL,
    };
  } catch (error) {
    throw error;
  }
};

export const PServices = {
  payment_success_service,
  payment_cancel_service,
  payment_fail_service,
  payment_oldBooking_service,
};
