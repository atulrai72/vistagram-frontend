import ReelItem from "@/features/reels/reel-item";
import { useReels } from "@/features/reels/use-reels";
import { useEffect, useRef } from "react";

export default function ReelsPage() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useReels();

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    console.log("Trigger visible, fetching next page...");
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (status === "pending")
        return <div className="p-10 text-center">Loading Feed...</div>;
    if (status === "error")
        return (
            <div className="p-10 text-center text-red-500">Error loading feed</div>
        );

    const allReels = data?.pages.flatMap((page) => page.posts) || [];

    return (
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">

            {allReels.map((video: any) => (
                <ReelItem key={video.id} data={video} />
            ))}
            <div ref={loadMoreRef} className="h-10 w-full snap-start flex justify-center items-center">
                {isFetchingNextPage && <span className="text-white text-xs">Loading more...</span>}
                {!hasNextPage && <span className="text-black text-xs">You see the all</span>}
            </div>
        </div>
    );
}





