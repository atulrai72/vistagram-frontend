import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { reset } from "@/services/api-reset";
import type { resetSchema } from "@/schemas";
import * as z from "zod";

export function useReset() {
  const navigate = useNavigate();

  const { mutate: resetApi, isPending } = useMutation({
    mutationFn: ({ otp, newPassword }: z.infer<typeof resetSchema>) =>
      reset({ otp, newPassword }),
    onSuccess: () => {
      toast.success("Email changed successfully!");
      navigate("/login");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Something went wrong");
    },
  });

  return { resetApi, isPending };
}
