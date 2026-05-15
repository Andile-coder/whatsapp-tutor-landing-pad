import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { bootstrapAdminAuth } from "@/features/auth/store/adminAuthSlice";

const AuthBootstrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const isBootstrapped = useAppSelector(
    (state) => state.adminAuth.isBootstrapped
  );

  useEffect(() => {
    if (!isBootstrapped) {
      dispatch(bootstrapAdminAuth());
    }
  }, [dispatch, isBootstrapped]);

  return <>{children}</>;
};

export default AuthBootstrapper;
