import { model, Schema } from "mongoose";
import { bookingStatus, IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    tour: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
    payment: { type: Schema.Types.ObjectId, ref: "payment" },
    status: {
      type: String,
      enum: Object.values(bookingStatus),
      default: bookingStatus.PENDING,
    },
    guestCount: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
