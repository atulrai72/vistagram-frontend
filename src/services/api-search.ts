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

export const getSearchResults = async ({ queryKey }: any) => {
  const [_key, queryString] = queryKey;
  console.log(queryString);

  const { data } = await api.get(`/search?query=${queryString}`);
  return data;
};
