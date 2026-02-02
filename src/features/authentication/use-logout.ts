import { logoutUser } from "@/services/api-auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const {mutate: logoutAPi, isPending} = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/login");
      toast.success("Logout successful");
    },
    onError: () => {
      toast.error("Logout failed");
    }
  })

  return {logoutAPi, isPending}
}