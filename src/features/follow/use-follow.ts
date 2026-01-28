import { useMutation } from "@tanstack/react-query";
import { followUser, unfollowUser } from "../../services/api-follow";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useFollow = () => {
  const queryClient = useQueryClient();
  const { mutate: useFollowApi, isPending } = useMutation({
    mutationFn: (id: number) => followUser(id),
    onSuccess: () => {
      toast.success("Followed successfully");
      queryClient.invalidateQueries({
        queryKey: ["other-user"],
      });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  return { useFollowApi, isPending };
};

export const useUnFollow = () => {
  const queryClient = useQueryClient();
  const { mutate: useUnFollowApi, isPending } = useMutation({
    mutationFn: (id: number) => unfollowUser(id),
    onSuccess: () => {
      toast.success("Unfollowed successfully");
      queryClient.invalidateQueries({
        queryKey: ["other-user"],
      });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  return { useUnFollowApi, isPending };
};
