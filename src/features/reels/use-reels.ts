import { getReels } from "@/services/api-reels";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useReels = () => {
    return useInfiniteQuery({
        queryKey: ["reels"],
        queryFn: getReels,
        initialPageParam: undefined as number | undefined,

        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor ?? undefined;
        },
        staleTime: 1000 * 60 * 5,
    });
};

