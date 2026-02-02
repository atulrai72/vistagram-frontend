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

export const getReels = async ({ pageParam }: { pageParam?: number }) => {
    const { data } = await api.get("/posts/reels", {
        params: { cursor: pageParam },
    });
    return data;
};