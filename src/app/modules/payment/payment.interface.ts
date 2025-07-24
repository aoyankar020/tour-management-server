import { Types } from "mongoose";

export enum PStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
  FAILED = "FAILED",
  CANCELED = "CANCELED",
  REFUNDED = "REFUNDED",
}

export interface IPayment {
  booking: Types.ObjectId;
  ammount: number;
  transactionId: string;
  paymentGateway?: any;
  status: PStatus;
  invoice?: string;
}
