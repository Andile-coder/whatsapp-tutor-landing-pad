import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isBootstrapped, tokens } = useAppSelector((state) => state.adminAuth);

  if (!isBootstrapped) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Checking admin session...
      </div>
    );
  }

  if (!tokens?.accessToken) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
