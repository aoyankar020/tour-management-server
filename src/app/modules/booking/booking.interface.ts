import { Types } from "mongoose";
export enum bookingStatus {
  PENDING = "PENDING",
  CANCLE = "CANCLE",
  FAILED = "FAILED",
  COMPLETE = "COMPLETE",
}
export interface IBooking {
  user: Types.ObjectId;
  tour: Types.ObjectId;
  payment?: Types.ObjectId;
  guestCount: Number;
  status: bookingStatus;
}
