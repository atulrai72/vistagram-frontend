import axios from "axios";

export interface Post {
  id: number;
  file_url: string;
  userId: number;
  file_type: string,
  caption: string,
  author: {
    name: string;
    email?: string;
    avatar_url: string
  };
  comments: any[];
}

interface PostsResponse {
  message: string;
  posts: Post[];
  nextCursor: number | null;
}

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  // withCredentials: true,  // TODO: I have to implement this
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchPosts = async ({ pageParam }: { pageParam?: number }) => {
  const { data } = await api.get<PostsResponse>("/posts/all-posts-with-user", {
    params: { cursor: pageParam },
  });
  return data;
};
