import { passwordSchema } from "@/pages/user-management";
import type { loginSchema, registerSchema } from "@/schemas";
import axios from "axios";
import * as z from "zod";

// TODO: SignUp

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

export async function signup({
  email,
  password,
}: z.infer<typeof registerSchema>) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:3001/api/auth/sign-up",
      {
        name,
        email,
        password,
      },
    );

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "signup failed";
    throw new Error(errorMessage);
  }
}

export async function login({ email, password }: z.infer<typeof loginSchema>) {
  try {
    const response = await axios.post("http://127.0.0.1:3001/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Login failed";
    throw new Error(errorMessage);
  }
}

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/users/get-current-user");
    return data.loggedInUser;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Error while fetching the current user";
    throw new Error(errorMessage);
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await api.post("/logout");
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Error while logout";
    throw new Error(errorMessage);
  }
};

export async function updatePassword({
  oldPassword,
  newPassword,
  confirmPassword,
}: z.infer<typeof passwordSchema>) {
  try {
    const response = await api.put("/auth/update-password", {
      oldPassword,
      newPassword,
      confirmPassword,
    });

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Password updation failed!";
    throw new Error(errorMessage);
  }
}
