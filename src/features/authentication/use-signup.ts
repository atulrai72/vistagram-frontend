import type { registerSchema } from "@/schemas";
import { signup } from "@/services/api-auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import toast from "react-hot-toast";

export function useSignup() {
//   const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signupApi, isPending } = useMutation({
    mutationFn: ({ name, email, password }: z.infer<typeof registerSchema>) =>
      signup({ name, email, password }),
    onSuccess: () => {
     toast.success("User created successfull, Now login")
     navigate("/login");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Something went wrong");
    },
  });

  return { signupApi, isPending };
}
