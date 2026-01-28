import { useCurrentUserProfile } from "@/features/profile/use-profile";

export default function Profile() {
    const {currentUser} = useCurrentUserProfile();

  return (
    <div className="min-h-screen text-black">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          
          <div className="w-36 h-36 rounded-full bg-zinc-800 overflow-hidden">
            <img
              src={currentUser?.userDetails.avatar_url}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h2 className="text-xl font-semibold">{currentUser?.userDetails.name}</h2>
            </div>

            <div className="flex justify-center md:justify-start gap-6 mt-4 text-sm">
              <span><b>{currentUser?.userDetails.posts.length}</b> posts</span>
              <span><b>{currentUser?.userDetails.followers.length}</b> follower</span>
              <span><b>{currentUser?.userDetails.following.length}</b> following</span>
            </div>
            <p className="mt-3 text-sm text-zinc-800">
              Life finds a way at the end.
            </p>

            {/* <div className="flex justify-center md:justify-start gap-3 mt-4">
              <button className="bg-zinc-800 px-4 py-1.5 rounded-md text-sm hover:bg-zinc-700">
                Edit profile
              </button>
              <button className="bg-zinc-800 px-4 py-1.5 rounded-md text-sm hover:bg-zinc-700">
                View archive
              </button>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-4 mt-20">
          {currentUser?.userDetails.posts.map((post: any, i: number) => (
            <div key={i} className="aspect-square bg-zinc-800">
              {post?.file_type === "image" ?<img
                src={post?.file_url}
                className="w-full h-full object-cover"
              /> :
               <video
                src={post?.file_url}
                controls
                loop
                className="w-full h-full object-cover"
               />
              }
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
