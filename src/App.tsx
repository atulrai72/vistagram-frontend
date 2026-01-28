import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { Toaster } from "react-hot-toast";
import DashBoard from "./pages/dashboard";
import { UpdateAccountPage } from "./pages/user-management";
import ProtectedRoutes from "./components/auth/protected-route";
import AppLayout from "./components/app-layout";
import CreatePost from "./pages/create";
import { Forgot } from "./pages/forgot-password";
import { Reset } from "./pages/reset-password";
import Profile from "./pages/profile";
import SpecificUserProfile from "./pages/user-profile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/user-management" element={<UpdateAccountPage />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/profile/:userId" element={<SpecificUserProfile/>}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password" element={<Reset />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
