// components/Posts.tsx
import { useEffect, useRef } from "react";
import { usePosts } from "./use-posts";
import { throttle } from "lodash";

export default function Posts() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePosts();

  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  useEffect(() => {
    const handleScroll = throttle(() => {
      const isNearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (isNearBottom && hasNextPage && !isFetchingNextPage) {
        console.log("Reached bottom, fetching next page...");
        fetchNextPage();
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending")
    return <div className="p-10 text-center">Loading Feed...</div>;
  if (status === "error")
    return (
      <div className="p-10 text-center text-red-500">Error loading feed</div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 pb-20">
      {allPosts.map((post) => (
        <div
          key={post.id}
          className="w-full max-w-md bg-white rounded-lg shadow-md my-4 overflow-hidden"
        >
          <div className="flex items-center p-3 border-b">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {post.author.name[0]}
            </div>
            <span className="ml-3 font-semibold text-gray-800">
              {post.author.name}
            </span>
          </div>
          <img
            src={post.file_url}
            alt="Post content"
            className="w-full h-96 object-cover"
          />
          <div className="p-3">
            <div className="flex gap-4 mb-2">
              <button className="text-2xl hover:text-red-500">♡</button>
              <button className="text-2xl hover:text-blue-500">💬</button>
            </div>
            <p>
              <span className="font-bold mr-2">{post.author.name}</span>
              Just uploaded a new photo!
            </p>
          </div>
        </div>
      ))}
      {isFetchingNextPage && (
        <div className="p-4 text-gray-500 font-medium animate-pulse">
          Loading more posts...
        </div>
      )}

      {!hasNextPage && (
        <div className="p-10 text-gray-400">You have seen it all!</div>
      )}
    </div>
  );
}
