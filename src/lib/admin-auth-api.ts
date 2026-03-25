import { AdminTokens, AdminUser } from "@/types/admin-auth";

const ADMIN_API_BASE_URL = (
  import.meta.env.VITE_ADMIN_API_BASE_URL || "http://127.0.0.1:3000"
).replace(/\/$/, "");

type ApiSuccess<T> = T & { success: true };
type ApiFailure = {
  success: false;
  error?: string;
  message?: string;
};

type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

type RequestOtpResponse = {
  message: string;
  phone_number: string;
  expires_in: number;
  otp_id: string;
};

type VerifyOtpResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  session_id: string;
  admin_user: AdminUser;
};

type MeResponse = {
  admin_user: AdminUser;
};

type LogoutResponse = {
  revoked_sessions: number;
};

type CreateAdminUserRequest = {
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string;
};

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

const extractApiError = (payload: ApiFailure, fallback: string) =>
  payload.error || payload.message || fallback;

const request = async <T>(
  path: string,
  init?: RequestInit
): Promise<ApiSuccess<T>> => {
  const response = await fetch(`${ADMIN_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  let payload: ApiResponse<T> | null = null;

  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.success) {
    throw new AdminApiError(
      extractApiError(payload as ApiFailure, "Request failed"),
      response.status
    );
  }

  return payload;
};

const authHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

export const adminAuthApi = {
  createAdminUser: async (body: CreateAdminUserRequest) =>
    request<{ admin_user: AdminUser }>("/v4/admin/auth/admin_users", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  requestOtp: async (phoneNumber: string) =>
    request<RequestOtpResponse>("/v4/admin/auth/request_otp", {
      method: "POST",
      body: JSON.stringify({ phone_number: phoneNumber }),
    }),

  verifyOtp: async (body: {
    phoneNumber: string;
    otp: string;
    deviceName: string;
    deviceId: string;
  }) =>
    request<VerifyOtpResponse>("/v4/admin/auth/verify_otp", {
      method: "POST",
      body: JSON.stringify({
        phone_number: body.phoneNumber,
        otp: body.otp,
        device_name: body.deviceName,
        device_id: body.deviceId,
      }),
    }),

  refresh: async (refreshToken: string) =>
    request<VerifyOtpResponse>("/v4/admin/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    }),

  me: async (accessToken: string) =>
    request<MeResponse>("/v4/admin/auth/me", {
      method: "GET",
      headers: authHeaders(accessToken),
    }),

  logout: async (accessToken: string, refreshToken: string) =>
    request<LogoutResponse>("/v4/admin/auth/logout", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify({ refresh_token: refreshToken }),
    }),

  logoutAll: async (phoneNumber: string) =>
    request<LogoutResponse & { phone_number: string }>(
      "/v4/admin/auth/logout_all",
      {
        method: "POST",
        body: JSON.stringify({ phone_number: phoneNumber }),
      }
    ),
};

export const mapTokenPayload = (
  payload: Pick<
    VerifyOtpResponse,
    "access_token" | "refresh_token" | "session_id" | "expires_in" | "token_type"
  >
): AdminTokens => ({
  accessToken: payload.access_token,
  refreshToken: payload.refresh_token,
  sessionId: payload.session_id,
  expiresIn: payload.expires_in,
  tokenType: payload.token_type,
});
