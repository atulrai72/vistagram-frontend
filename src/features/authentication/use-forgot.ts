import type { forgotPasswordSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import toast from "react-hot-toast";
import { forgot } from "@/services/api-forgot";

export function useForgot() {
  const navigate = useNavigate();

  const { mutate: forgotApi, isPending } = useMutation({
    mutationFn: ({ email }: z.infer<typeof forgotPasswordSchema>) =>
      forgot({ email }),
    onSuccess: () => {
     toast.success("Email send to registered email id.")
     navigate("/reset-password");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Something went wrong");
    },
  });

  return { forgotApi, isPending };
}
