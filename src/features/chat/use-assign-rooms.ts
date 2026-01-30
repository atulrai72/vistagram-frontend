import { assignRooms } from "@/services/api-chat";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAssignRooms = () => {
  const { mutateAsync: assignRoomsApi, isPending: isAssigning } = useMutation({
    mutationFn: (id: number) => assignRooms(id),
    onSuccess: () => {
      toast.success("Now you are gonna chat with this user");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Something went wrong");
    },
  });

  return { assignRoomsApi, isAssigning };
};
