import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../../services/api-posts";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePost,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts-feed"] });
            toast.success("Post deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete post");
        }
    });
};
