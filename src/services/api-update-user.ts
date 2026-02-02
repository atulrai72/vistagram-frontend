// api-create.ts
import type { profileSchema } from "@/pages/user-management";
import axios from "axios";
import * as z from "zod";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, 
});

export const updateUser = async ({ name, avatar }: z.infer<typeof profileSchema>) => {
  const formData = new FormData();

  if (name) formData.append("name", name);

  if (avatar instanceof File) {
    formData.append("file", avatar);
  }

  const { data } = await api.put("/auth/update-user", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};