import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, 
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
