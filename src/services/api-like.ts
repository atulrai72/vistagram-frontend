// services/api-comment.ts
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

// POST a new like
export const toogleLike = async (postId: number) => {
  const { data } = await api.post(`/likes/toggle/${postId}`, {
    postId,
  });
  return data;
};
