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

export const getMultualUser = async () => {
  const { data } = await api.get(`/chat/mutual-users`);
  return data;
};

export const assignRooms = async (id: number) => {
  const { data } = await api.post(`/chat/assign-room/${id}`);
  return data;
};
