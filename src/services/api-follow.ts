import axios from "axios";

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

export const followUser = async (id: number) => {
  try {
    const response = await api.post(`/users/follow/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error following user:", error);
    throw error.response.data.message;
  }
};

export const unfollowUser = async (id: number) => {
  try {
    const response = await api.post(`/users/unfollow/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error while unfollow user:", error);
    throw error.response.data.message;
  }
};
