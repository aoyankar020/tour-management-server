import z from "zod";
import { bookingStatus, IBooking } from "./booking.interface";

export const createBookigSchema = z.object({
  tour: z.string(),
  guestCount: z.number().int().positive(),
});
export const updateBookigSchema = z.object({
  status: z.enum(Object.values(bookingStatus) as [string]),
});
