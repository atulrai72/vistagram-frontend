import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, 
});

export const getSearchResults = async ({ queryKey }: any) => {
  const [_key, queryString] = queryKey;
  console.log(queryString);

  const { data } = await api.get(`/search?query=${queryString}`);
  return data;
};
