import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true, 
});

export const getReels = async ({ pageParam }: { pageParam?: number }) => {
    const { data } = await api.get("/posts/reels", {
        params: { cursor: pageParam },
    });
    return data;
};