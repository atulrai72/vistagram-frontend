// api-create.ts
import axios from "axios";

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

export const createPost = async (file: File) => {
  const formData = new FormData();
  
  formData.append("file", file); 

  const { data } = await api.post("/posts/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return data;
};