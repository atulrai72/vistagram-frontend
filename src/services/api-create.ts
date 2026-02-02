// api-create.ts
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

export const createPost = async ({ caption, file }: any) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("caption", caption);

  const { data } = await api.post("/posts/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
