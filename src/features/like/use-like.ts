import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { toogleLike } from "@/services/api-like";

export function useToogleLike() {
  const queryClient = useQueryClient();

  const { mutate: toogleLikeApi, isPending } = useMutation({
    mutationFn: (postId: number) => toogleLike(postId),
    onSuccess: (_) => {
      queryClient.invalidateQueries({
        queryKey: ["posts-feed"],
      });
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Something went wrong");
    },
  });

  return { toogleLikeApi, isPending };
}
