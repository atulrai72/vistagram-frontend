// services/api-comment.ts
import type { commentSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

// POST a new comment
export const postComments = async ({
  comment,
  postId,
}: z.infer<typeof commentSchema>) => {
  const { data } = await api.post("/comments/post-comment", {
    comment,
    postId,
  });
  return data;
};

// GET all comments for a post
export const getComments = async (postId: number) => {
  const { data } = await api.get(`/comments/comment/${postId}`);
  return data.allComments;
};

// Delete a comment
export const deleteComment = async (id: number) => {
  const { data } = await api.delete(`/comments/delete-comment/${id}`);
  return data;
};