import { useEffect } from "react";
import { usePosts } from "./use-posts";
import { throttle } from "lodash";
import { CommentDialog } from "@/features/comment-modal/comment-modal";
import { HiTrash } from "react-icons/hi2"
import PostDelete from "@/components/post-delete";
import { useUser } from "../authentication/use-user";
import { FaHeart } from "react-icons/fa"
import { AiOutlineHeart } from 'react-icons/ai'
import { useToogleLike } from "../like/use-like";

export default function Posts() {
  const { user } = useUser();
  const { toogleLikeApi, isPending: isLiking} = useToogleLike();
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
  
    const handleToogleLike = (postId : number) => {
        toogleLikeApi(postId);
    }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 pb-20">
      {allPosts.map((post) => (
        <div
          key={post.id}
          className="w-full max-w-md bg-white rounded-lg shadow-md my-4 overflow-hidden"
        >
          <div className="flex items-center p-3 border-b">
            <div className="w-8 h-8  rounded-full flex items-center justify-center text-white font-bold">
              <img src={post.author.avatar_url} />
            </div>
            <span className="ml-3 font-semibold text-gray-800">
              {post.author.name}
            </span>
            <div className="ml-auto">
              {/* TODO: Add the model here */}
              {user?.id === post.author.id && (
                <PostDelete postId={post.id}>
                  <button className="text-2xl hover:text-red-500"><HiTrash /></button>
                </PostDelete>
              )}
            </div>
          </div>
          {post.file_type === "video" ? <video
            id="player"
            controls
            playsInline
            className="w-full h-96 object-cover"
          >
            <source src={post.file_url} type="video/mp4" />
          </video>
            : <img src={post.file_url} />}

          <div className="p-3">
            <div className="flex gap-4 mb-2">
              <button className="text-2xl">
               <div className="flex gap-2">
                 {post.hasLiked ? <div>
                  <button onClick={() => handleToogleLike(post.id)} disabled={isLiking}>
                 <FaHeart style={{ color: 'red' }}/>
                 </button>
                </div> : <div className=" hover:text-red-500"> 
                  <button onClick={() => handleToogleLike(post.id)} disabled={isLiking}> <AiOutlineHeart /></button>
                </div>}
               <div>
                 {post.likeCount}
               </div>
               </div>
              </button>
              <CommentDialog postId={post.id}>
                <button className="text-2xl hover:cursor-pointer">💬 {post?.commentCount}</button>
              </CommentDialog>
            </div>
            <p>
              <span className="font-bold mr-2">{post.author.name}</span>
              {post.caption}
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
