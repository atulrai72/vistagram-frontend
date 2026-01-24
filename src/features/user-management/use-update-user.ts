import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "@/services/api-update-user";
import type { profileSchema } from "@/pages/user-management";
import * as z from "zod";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUserApi, isPending } = useMutation({
    mutationFn: ( {name, avatar}: z.infer<typeof profileSchema>) =>
    updateUser({name, avatar}),
    onSuccess: () => {
     toast.success("User updated succesfully!");
     queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Something went wrong");
    },
  });

  return { updateUserApi, isPending };
}
