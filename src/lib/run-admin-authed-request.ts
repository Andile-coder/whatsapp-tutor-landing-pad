import { AppDispatch, RootState } from "@/store";
import { AdminApiError, adminAuthApi, mapTokenPayload } from "@/lib/admin-auth-api";
import {
  clearStoredAdminSession,
  saveStoredAdminSession,
} from "@/lib/admin-auth-storage";
import {
  clearAdminSession,
  setAdminSession,
} from "@/store/slices/adminAuthSlice";

const isUnauthorizedError = (error: unknown) =>
  error instanceof AdminApiError && error.status === 401;

export const runAdminAuthedRequest = async <T>({
  getState,
  dispatch,
  requestFn,
}: {
  getState: () => RootState;
  dispatch: AppDispatch;
  requestFn: (accessToken: string) => Promise<T>;
}) => {
  const state = getState();
  const currentTokens = state.adminAuth.tokens;
  const currentAdminUser = state.adminAuth.adminUser;

  if (!currentTokens?.accessToken || !currentTokens.refreshToken) {
    throw new Error("No active admin session");
  }

  try {
    return await requestFn(currentTokens.accessToken);
  } catch (error) {
    if (!isUnauthorizedError(error)) {
      throw error;
    }
  }

  try {
    const refreshed = await adminAuthApi.refresh(currentTokens.refreshToken);
    const refreshedTokens = mapTokenPayload(refreshed);
    const refreshedAdminUser = refreshed.admin_user || currentAdminUser;

    saveStoredAdminSession({
      tokens: refreshedTokens,
      adminUser: refreshedAdminUser,
    });

    dispatch(
      setAdminSession({
        tokens: refreshedTokens,
        adminUser: refreshedAdminUser,
      })
    );

    return await requestFn(refreshedTokens.accessToken);
  } catch (error) {
    clearStoredAdminSession();
    dispatch(clearAdminSession());
    throw error instanceof Error ? error : new Error("Invalid refresh token");
  }
};
