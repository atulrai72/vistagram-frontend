import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/api-posts";

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts-feed"],
    queryFn: fetchPosts,
    initialPageParam: undefined as number | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
  });
};
