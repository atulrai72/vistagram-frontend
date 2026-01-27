import type { commentSchema } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import toast from "react-hot-toast";
import {
  postComments,
  getComments,
  deleteComment,
} from "@/services/api-comment";

export function useCommentPost() {
  const queryClient = useQueryClient();

  const { mutate: commentApi, isPending } = useMutation({
    mutationFn: ({ comment, postId }: z.infer<typeof commentSchema>) =>
      postComments({ comment, postId }),
    onSuccess: (_, variables) => {
      toast.success("Comment posted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Something went wrong");
    },
  });

  return { commentApi, isPending };
}

export function useGetComments(postId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId, // Only fetch if postId exists
  });

  return { data, isLoading, error };
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  const { mutate: deleteCommentApi, isPending } = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      // toast.success("Comment deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (error) => {
      console.log("Error", error);
      // toast.error("Something went wrong");
    },
  });

  return { deleteCommentApi, isPending };
}
