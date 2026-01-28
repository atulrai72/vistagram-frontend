import { Button } from "@/components/ui/button";
import { useOtherUserProfile } from "@/features/profile/use-profile";
import { useUser } from "@/features/authentication/use-user";
import { useParams } from "react-router-dom";
import { useFollow, useUnFollow } from "@/features/follow/use-follow";

export default function SpecificUserProfile() {
  const { useFollowApi, isPending } = useFollow();
  const { useUnFollowApi, isPending: isUnfollowing } = useUnFollow();
  const { user } = useUser();
  const { userId } = useParams();
  const id = Number(userId);
  const { otherUser } = useOtherUserProfile(id);

  const isFollowing = otherUser?.userDetails?.followers?.some(
    (follower: any) => follower.followerId === user?.id,
  );

  function handleFollow() {
    useFollowApi(id);
  }

  function handleUnfollow() {
    useUnFollowApi(id);
  }

  return (
    <div className="min-h-screen text-black">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="w-36 h-36 rounded-full bg-zinc-800 overflow-hidden">
            <img
              src={otherUser?.userDetails.avatar_url}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h2 className="text-xl font-semibold">
                {otherUser?.userDetails.name}
              </h2>
            </div>

            <div className="flex justify-center md:justify-start gap-6 mt-4 text-sm">
              <span>
                <b>{otherUser?.userDetails.posts.length}</b> posts
              </span>
              <span>
                <b>{otherUser?.userDetails.followers.length}</b> follower
              </span>
              <span>
                <b>{otherUser?.userDetails.following.length}</b> following
              </span>
            </div>
            <p className="mt-3 text-sm text-zinc-800">
              Life finds a way at the end.
            </p>
            <div className="mt-5">
              {isFollowing ? (
                <Button onClick={handleUnfollow} disabled={isUnfollowing}>
                  {isPending ? "UnFollowing..." : "UnFollow"}
                </Button>
              ) : (
                <Button onClick={handleFollow} disabled={isPending}>
                  {isPending ? "Following..." : "Follow"}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-4 mt-20">
          {otherUser?.userDetails.posts.map((post: any, i: number) => (
            <div key={i} className="aspect-square bg-zinc-800">
              {post?.file_type === "image" ? (
                <img
                  src={post?.file_url}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={post?.file_url}
                  controls
                  loop
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
