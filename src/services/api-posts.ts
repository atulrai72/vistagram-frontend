import axios from "axios";

export interface Post {
  id: number;
  file_url: string;
  userId: number;
  file_type: string;
  caption: string;
  author: {
    id: number;
    name: string;
    email?: string;
    avatar_url: string;
  };
  likeCount: number;
  commentCount: number;
  hasLiked: boolean;
}

interface PostsResponse {
  message: string;
  posts: Post[];
  nextCursor: number | null;
}

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, 
});

export const fetchPosts = async ({ pageParam }: { pageParam?: number }) => {
  const { data } = await api.get<PostsResponse>("/posts/all-posts-with-user", {
    params: { cursor: pageParam },
  });
  return data;
};

export const deletePost = async (postId: number) => {
  const { data } = await api.delete<Post>(`/posts/delete/${postId}`);
  return data;
};

