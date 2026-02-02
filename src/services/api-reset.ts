import type { resetSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

export async function reset({ otp, newPassword }: z.infer<typeof resetSchema>) {
  try {
    const response = await axios.put("http://localhost:3001/api/auth/reset", {
      otp,
      newPassword,
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "failed";
    throw new Error(errorMessage);
  }
}
