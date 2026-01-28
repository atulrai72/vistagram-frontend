// GET the current user detail
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

export const getCurrentUserProfile = async () => {
  const { data } = await api.get("/users/current-user-details");
  return data;
};

// Get the specific user detail

export const getTheSpecificUserDetail = async ({ queryKey }: any) => {
  const [_key, id] = queryKey;
  console.log(id);

  const { data } = await api.get(`/users/user-detail/${id}`);
  return data;
};
