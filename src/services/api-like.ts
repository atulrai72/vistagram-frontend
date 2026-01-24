// services/api-comment.ts
import type { likeSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// POST a new comment
export const postLike = async ({
  like,
  postId,
}: z.infer<typeof likeSchema>) => {
  const { data } = await api.post("/likes/post-likes", {
    like,
    postId,
  });
  return data;
};

// GET all comments for a post
export const getLikes = async (postId: number) => {
  const { data } = await api.get(`/likes/like/${postId}`);    
  return data.allLikes;
};
