import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const PublicOnlyRoute = () => {
  const { isBootstrapped, tokens } = useAppSelector((state) => state.adminAuth);

  if (!isBootstrapped) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Checking admin session...
      </div>
    );
  }

  if (tokens?.accessToken) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
