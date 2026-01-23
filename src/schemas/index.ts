import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required" }),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be of minimum 3 characters." })
    .max(20, { message: "Name must be max upto 20 characters" }),
  email: z
    .email()
    .max(50, { message: "email id not be greater than 50 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be more than 6 characters" })
    .max(100, { message: "Password must be less than 100 characters" }),
});
