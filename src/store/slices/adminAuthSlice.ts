import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminAuthApi, mapTokenPayload } from "@/lib/admin-auth-api";
import {
  clearStoredAdminSession,
  loadStoredAdminSession,
  saveStoredAdminSession,
} from "@/lib/admin-auth-storage";
import { performAdminAuthedRequest } from "@/store/utils/performAdminAuthedRequest";
import { AdminTokens, AdminUser } from "@/types/admin-auth";

type RequestOtpPayload = {
  phoneNumber: string;
};

type VerifyOtpPayload = {
  phoneNumber: string;
  otp: string;
  deviceName: string;
  deviceId: string;
};

type AdminAuthState = {
  isBootstrapped: boolean;
  status: "idle" | "loading" | "authenticated" | "error";
  otpRequestStatus: "idle" | "loading" | "succeeded" | "error";
  verifyStatus: "idle" | "loading" | "succeeded" | "error";
  logoutStatus: "idle" | "loading" | "error";
  adminUser: AdminUser | null;
  tokens: AdminTokens | null;
  otpPhoneNumber: string;
  otpId: string | null;
  otpExpiresIn: number | null;
  error: string | null;
};

const storedSession = loadStoredAdminSession();

const initialState: AdminAuthState = {
  isBootstrapped: false,
  status: storedSession?.tokens ? "loading" : "idle",
  otpRequestStatus: "idle",
  verifyStatus: "idle",
  logoutStatus: "idle",
  adminUser: storedSession?.adminUser || null,
  tokens: storedSession?.tokens || null,
  otpPhoneNumber: storedSession?.adminUser?.phone_number || "",
  otpId: null,
  otpExpiresIn: null,
  error: null,
};

const persistSession = (tokens: AdminTokens, adminUser: AdminUser | null) => {
  saveStoredAdminSession({
    tokens,
    adminUser,
  });
};

export const requestAdminOtp = createAsyncThunk(
  "adminAuth/requestOtp",
  async ({ phoneNumber }: RequestOtpPayload, { rejectWithValue }) => {
    try {
      return await adminAuthApi.requestOtp(phoneNumber);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to request OTP"
      );
    }
  }
);

export const fetchCurrentAdmin = createAsyncThunk(
  "adminAuth/fetchCurrentAdmin",
  async (_, tools) =>
    performAdminAuthedRequest(
      tools as never,
      (accessToken) => adminAuthApi.me(accessToken),
      "Failed to load admin profile",
      {
        onSessionRefreshed: setAdminSession,
        onSessionInvalid: clearAdminSession,
      }
    )
);

export const refreshAdminSession = createAsyncThunk(
  "adminAuth/refreshSession",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { adminAuth: AdminAuthState };
      const refreshToken = state.adminAuth.tokens?.refreshToken;

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      return await adminAuthApi.refresh(refreshToken);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Invalid refresh token"
      );
    }
  }
);

export const verifyAdminOtp = createAsyncThunk(
  "adminAuth/verifyOtp",
  async (payload: VerifyOtpPayload, { rejectWithValue }) => {
    try {
      const verifyResponse = await adminAuthApi.verifyOtp(payload);
      const tokens = mapTokenPayload(verifyResponse);

      persistSession(tokens, verifyResponse.admin_user);

      const meResponse = await adminAuthApi.me(tokens.accessToken);
      persistSession(tokens, meResponse.admin_user);

      return {
        tokens,
        adminUser: meResponse.admin_user,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to verify OTP"
      );
    }
  }
);

export const bootstrapAdminAuth = createAsyncThunk(
  "adminAuth/bootstrap",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as { adminAuth: AdminAuthState };
      const tokens = state.adminAuth.tokens;

      if (!tokens?.refreshToken) {
        return {
          tokens: null,
          adminUser: null,
        };
      }

      if (tokens.accessToken) {
        try {
          const meResponse = await adminAuthApi.me(tokens.accessToken);
          persistSession(tokens, meResponse.admin_user);
          return {
            tokens,
            adminUser: meResponse.admin_user,
          };
        } catch {
          // Fall back to refresh.
        }
      }

      const refreshed = await dispatch(refreshAdminSession()).unwrap();
      const refreshedTokens = mapTokenPayload(refreshed);
      persistSession(refreshedTokens, refreshed.admin_user);

      const meResponse = await adminAuthApi.me(refreshedTokens.accessToken);
      persistSession(refreshedTokens, meResponse.admin_user);

      return {
        tokens: refreshedTokens,
        adminUser: meResponse.admin_user,
      };
    } catch (error) {
      clearStoredAdminSession();
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to restore session"
      );
    }
  }
);

export const logoutAdminSession = createAsyncThunk(
  "adminAuth/logout",
  async (_, tools) => {
    const result = await performAdminAuthedRequest(
      tools as never,
      async (accessToken) => {
        const state = tools.getState() as { adminAuth: AdminAuthState };
        const refreshToken = state.adminAuth.tokens?.refreshToken;

        if (!refreshToken) {
          throw new Error("No active session");
        }

        await adminAuthApi.logout(accessToken, refreshToken);
        return true;
      },
      "Logout failed",
      {
        onSessionRefreshed: setAdminSession,
        onSessionInvalid: clearAdminSession,
      }
    );

    if (typeof result === "boolean") {
      clearStoredAdminSession();
    }

    return result;
  }
);

export const logoutAllAdminSessions = createAsyncThunk(
  "adminAuth/logoutAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { adminAuth: AdminAuthState };
      const phoneNumber = state.adminAuth.adminUser?.phone_number;

      if (!phoneNumber) {
        throw new Error("No admin phone number available");
      }

      return await adminAuthApi.logoutAll(phoneNumber);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to log out all sessions"
      );
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    clearAdminAuthError: (state) => {
      state.error = null;
    },
    resetOtpFlow: (state) => {
      state.otpRequestStatus = "idle";
      state.verifyStatus = "idle";
      state.otpId = null;
      state.otpExpiresIn = null;
      state.error = null;
    },
    setAdminSession: (
      state,
      action: PayloadAction<{
        tokens: AdminTokens;
        adminUser: AdminUser | null;
      }>
    ) => {
      state.tokens = action.payload.tokens;
      state.adminUser = action.payload.adminUser;
      state.status = "authenticated";
      persistSession(action.payload.tokens, action.payload.adminUser);
    },
    clearAdminSession: (state) => {
      state.status = "idle";
      state.adminUser = null;
      state.tokens = null;
      state.otpId = null;
      state.otpExpiresIn = null;
      state.error = null;
      clearStoredAdminSession();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAdminOtp.pending, (state, action) => {
        state.otpRequestStatus = "loading";
        state.verifyStatus = "idle";
        state.otpPhoneNumber = action.meta.arg.phoneNumber;
        state.error = null;
      })
      .addCase(requestAdminOtp.fulfilled, (state, action) => {
        state.otpRequestStatus = "succeeded";
        state.otpPhoneNumber = action.payload.phone_number;
        state.otpId = action.payload.otp_id;
        state.otpExpiresIn = action.payload.expires_in;
      })
      .addCase(requestAdminOtp.rejected, (state, action) => {
        state.otpRequestStatus = "error";
        state.error = (action.payload as string) || "Failed to request OTP";
      })
      .addCase(verifyAdminOtp.pending, (state) => {
        state.verifyStatus = "loading";
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyAdminOtp.fulfilled, (state, action) => {
        state.verifyStatus = "succeeded";
        state.status = "authenticated";
        state.tokens = action.payload.tokens;
        state.adminUser = action.payload.adminUser;
        state.otpPhoneNumber = action.payload.adminUser.phone_number;
      })
      .addCase(verifyAdminOtp.rejected, (state, action) => {
        state.verifyStatus = "error";
        state.status = "error";
        state.error = (action.payload as string) || "Failed to verify OTP";
      })
      .addCase(fetchCurrentAdmin.fulfilled, (state, action) => {
        state.adminUser = action.payload.admin_user;
        if (state.tokens) {
          persistSession(state.tokens, action.payload.admin_user);
        }
      })
      .addCase(refreshAdminSession.fulfilled, (state, action) => {
        const tokens = mapTokenPayload(action.payload);
        state.tokens = tokens;
        state.adminUser = action.payload.admin_user;
        state.status = "authenticated";
        persistSession(tokens, action.payload.admin_user);
      })
      .addCase(refreshAdminSession.rejected, (state, action) => {
        state.status = "error";
        state.error = (action.payload as string) || "Invalid refresh token";
      })
      .addCase(bootstrapAdminAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bootstrapAdminAuth.fulfilled, (state, action) => {
        state.isBootstrapped = true;
        state.status = action.payload.tokens ? "authenticated" : "idle";
        state.tokens = action.payload.tokens;
        state.adminUser = action.payload.adminUser;
      })
      .addCase(bootstrapAdminAuth.rejected, (state, action) => {
        state.isBootstrapped = true;
        state.status = "idle";
        state.tokens = null;
        state.adminUser = null;
        state.error = (action.payload as string) || "Failed to restore session";
      })
      .addCase(logoutAdminSession.pending, (state) => {
        state.logoutStatus = "loading";
        state.error = null;
      })
      .addCase(logoutAdminSession.fulfilled, (state) => {
        state.isBootstrapped = true;
        state.status = "idle";
        state.logoutStatus = "idle";
        state.tokens = null;
        state.adminUser = null;
        state.otpId = null;
        state.otpExpiresIn = null;
      })
      .addCase(logoutAdminSession.rejected, (state, action) => {
        state.isBootstrapped = true;
        state.status = "idle";
        state.logoutStatus = "error";
        state.tokens = null;
        state.adminUser = null;
        state.error = (action.payload as string) || "Logout failed";
      })
      .addCase(logoutAllAdminSessions.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "Failed to log out all sessions";
      });
  },
});

export const {
  clearAdminAuthError,
  resetOtpFlow,
  setAdminSession,
  clearAdminSession,
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
