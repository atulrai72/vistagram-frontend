import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/features/authentication/use-user";
import { Spinner } from "../ui/spinner";

function ProtectedRoutes({ children }: any) {
  const navigate = useNavigate();
  
  const { isPending, isAuthenticated, user } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isPending && !user) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isPending, navigate]);

  if (isPending)
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (isAuthenticated) return children;
  
  return null; 
}

export default ProtectedRoutes;