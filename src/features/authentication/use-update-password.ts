import { updatePassword} from "@/services/api-auth";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import toast from "react-hot-toast";
import type { passwordSchema } from "@/pages/user-management";

export function useUpdatePassword() {

  const { mutate: updatePasswordApi, isPending } = useMutation({
    mutationFn: ({ oldPassword, newPassword, confirmPassword }: z.infer<typeof passwordSchema>) =>
      updatePassword({ oldPassword, newPassword, confirmPassword }),
    onSuccess: () => {
    toast.success("Password updated successfully");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Provided password is incorrect");
    },
  });

  return { updatePasswordApi, isPending };
}
