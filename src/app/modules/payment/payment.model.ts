import { model, Schema } from "mongoose";

import { IPayment, PStatus } from "./payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    ammount: { type: Number, required: true },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
    },
    invoice: { type: String },
    status: {
      type: String,
      enum: Object.values(PStatus),
      default: PStatus.UNPAID,
    },
    transactionId: { type: String, required: true, unique: true },
    paymentGateway: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Payment = model<IPayment>("payment", paymentSchema);
