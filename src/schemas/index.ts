import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required" }),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be of minimum 2 characters" })
    .max(20, { message: "Name must be max upto 20 characters" }),
  email: z
    .email()
    .max(50, { message: "email id not be greater than 50 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be more than 6 characters" })
    .max(100, { message: "Password must be less than 100 characters" }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .email()
    .max(50, { message: "email id not be greater than 50 characters" }),
});

export const resetSchema = z.object({
  otp: z.string().min(4, { message: "Otp is required" }),
  newPassword: z.string().min(6, { message: "Password is required" }),
});

export const commentSchema = z.object({
  comment: z
    .string()
    .max(500, { message: "Please write your comment upto 500 characters" }),
  postId: z.number(),
});

export const uploadPostSchema = z.object({
  description: z
    .string()
    .min(2, "Description must be at least 2 characters long"),
  file: z.any(),
});
