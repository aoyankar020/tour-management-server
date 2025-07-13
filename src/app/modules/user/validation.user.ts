import z from "zod";
import { ISACTIVE, ROLE } from "./interface.user";
export const userCreateZodSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .regex(/^(?=.*[A-Z]).*$/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/^(?=.*[ a-z]).*$/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/^(?=.*\d).*$/, {
      message: "Password must contain at least one digit",
    })
    .regex(/^(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~]).*$/, {
      message: "Password must contain at least one special character",
    })
    .optional(),
  phone: z
    .string()
    .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, {
      message: "Phone number must be a valid Bangladeshi mobile number",
    })
    .optional(),
  address: z
    .string()
    .min(20, { message: "Address must be at least 20 characters long" })
    .max(200, { message: "Address must not exceed 200 characters" })
    .optional(),
});

export const userUpdateZodSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .optional(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .regex(/^(?=.*[A-Z]).*$/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/^(?=.*[ a-z]).*$/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/^(?=.*\d).*$/, {
      message: "Password must contain at least one digit",
    })
    .regex(/^(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~]).*$/, {
      message: "Password must contain at least one special character",
    })
    .optional(),
  phone: z
    .string()
    .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, {
      message: "Phone number must be a valid Bangladeshi mobile number",
    })
    .optional(),
  address: z
    .string()
    .min(20, { message: "Address must be at least 20 characters long" })
    .max(200, { message: "Address must not exceed 200 characters" })
    .optional(),
  isDeleted: z.boolean().optional(),

  isActive: z.enum(Object.values(ISACTIVE)).optional(),
  isVerified: z.boolean().optional(),
  ROLE: z.enum(Object.values(ROLE)).optional(),
});
