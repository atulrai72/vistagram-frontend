import type { forgotPasswordSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

export async function forgot({
  email,
}: z.infer<typeof forgotPasswordSchema>) {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/auth/forgot",
      {
        email
      },
    );

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "failed";
    throw new Error(errorMessage);
  }
}