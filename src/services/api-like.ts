import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

// POST a new like
export const toogleLike = async (postId: number) => {
  const { data } = await api.post(`/likes/toggle/${postId}`, {
    postId,
  });
  return data;
};
