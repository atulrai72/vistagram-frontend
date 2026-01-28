import { getCurrentUser } from "@/services/api-auth";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    retry: false,
  });

  return {
    isPending,
    user,
    isAuthenticated: user?.id ? true : false,
  };
}
