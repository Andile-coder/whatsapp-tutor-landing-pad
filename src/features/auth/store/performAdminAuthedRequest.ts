import { runAdminAuthedRequest } from "@/features/auth/lib/runAdminAuthedRequest";
import { RootState } from "@/store";

type ThunkTools = {
  getState: () => RootState;
  dispatch: (action: unknown) => Promise<unknown> | unknown;
  rejectWithValue: (value: string) => unknown;
};

export const performAdminAuthedRequest = async <T>(
  tools: ThunkTools,
  requestFn: (accessToken: string) => Promise<T>,
  fallbackMessage: string
) => {
  try {
    return await runAdminAuthedRequest({
      getState: tools.getState,
      dispatch: tools.dispatch as never,
      requestFn,
    });
  } catch (error) {
    return tools.rejectWithValue(
      error instanceof Error ? error.message : fallbackMessage
    );
  }
};
