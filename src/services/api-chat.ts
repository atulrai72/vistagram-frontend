import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

export const getMultualUser = async () => {
  const { data } = await api.get(`/chat/mutual-users`);
  return data;
};

export const assignRooms = async (id: number) => {
  const { data } = await api.post(`/chat/assign-room/${id}`);
  return data;
};

export const getMessages = async (id: number) => {
  const { data } = await api.get(`/chat/messages/${id}`);
  return data;
};