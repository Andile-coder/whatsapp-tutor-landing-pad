import { AdminApiError, adminAuthApi, mapTokenPayload } from "@/lib/admin-auth-api";
import { clearStoredAdminSession, saveStoredAdminSession } from "@/lib/admin-auth-storage";
import { AdminTokens, AdminUser } from "@/types/admin-auth";
import { RootState } from "@/store";

type ThunkTools = {
  getState: () => RootState;
  dispatch: (action: unknown) => Promise<unknown> | unknown;
  rejectWithValue: (value: string) => unknown;
};

type RefreshActions = {
  onSessionRefreshed: (payload: {
    tokens: AdminTokens;
    adminUser: AdminUser | null;
  }) => unknown;
  onSessionInvalid: () => unknown;
};

const isUnauthorizedError = (error: unknown) =>
  error instanceof AdminApiError && error.status === 401;

const persistSession = (tokens: AdminTokens, adminUser: AdminUser | null) => {
  saveStoredAdminSession({ tokens, adminUser });
};

export const performAdminAuthedRequest = async <T>(
  tools: ThunkTools,
  requestFn: (accessToken: string) => Promise<T>,
  fallbackMessage: string,
  actions: RefreshActions
) => {
  const state = tools.getState();
  const currentTokens = state.adminAuth.tokens;
  const currentAdminUser = state.adminAuth.adminUser;

  if (!currentTokens?.accessToken || !currentTokens.refreshToken) {
    return tools.rejectWithValue("No active admin session");
  }

  try {
    return await requestFn(currentTokens.accessToken);
  } catch (error) {
    if (!isUnauthorizedError(error)) {
      return tools.rejectWithValue(
        error instanceof Error ? error.message : fallbackMessage
      );
    }
  }

  try {
    const refreshed = await adminAuthApi.refresh(currentTokens.refreshToken);
    const refreshedTokens = mapTokenPayload(refreshed);
    const refreshedAdminUser = refreshed.admin_user || currentAdminUser;

    persistSession(refreshedTokens, refreshedAdminUser);
    tools.dispatch(
      actions.onSessionRefreshed({
        tokens: refreshedTokens,
        adminUser: refreshedAdminUser,
      })
    );

    return await requestFn(refreshedTokens.accessToken);
  } catch (error) {
    clearStoredAdminSession();
    tools.dispatch(actions.onSessionInvalid());

    return tools.rejectWithValue(
      error instanceof Error ? error.message : "Invalid refresh token"
    );
  }
};
