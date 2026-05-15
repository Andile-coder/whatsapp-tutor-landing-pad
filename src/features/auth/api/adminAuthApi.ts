import { AdminTokens, AdminUser } from "@/features/auth/types/adminAuth";
import {
  adminApiRequest,
  authHeaders,
  jsonBody,
} from "@/features/auth/api/adminApiClient";

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

export const adminAuthApi = {
  createAdminUser: async (body: CreateAdminUserRequest) =>
    adminApiRequest<{ admin_user: AdminUser }>("/v4/admin/auth/admin_users", {
      method: "POST",
      body: jsonBody(body),
    }),

  requestOtp: async (phoneNumber: string) =>
    adminApiRequest<RequestOtpResponse>("/v4/admin/auth/request_otp", {
      method: "POST",
      body: jsonBody({ phone_number: phoneNumber }),
    }),

  verifyOtp: async (body: {
    phoneNumber: string;
    otp: string;
    deviceName: string;
    deviceId: string;
  }) =>
    adminApiRequest<VerifyOtpResponse>("/v4/admin/auth/verify_otp", {
      method: "POST",
      body: jsonBody({
        phone_number: body.phoneNumber,
        otp: body.otp,
        device_name: body.deviceName,
        device_id: body.deviceId,
      }),
    }),

  refresh: async (refreshToken: string) =>
    adminApiRequest<VerifyOtpResponse>("/v4/admin/auth/refresh", {
      method: "POST",
      body: jsonBody({ refresh_token: refreshToken }),
    }),

  me: async (accessToken: string) =>
    adminApiRequest<MeResponse>("/v4/admin/auth/me", {
      method: "GET",
      headers: authHeaders(accessToken),
    }),

  logout: async (accessToken: string, refreshToken: string) =>
    adminApiRequest<LogoutResponse>("/v4/admin/auth/logout", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: jsonBody({ refresh_token: refreshToken }),
    }),

  logoutAll: async (phoneNumber: string) =>
    adminApiRequest<LogoutResponse & { phone_number: string }>(
      "/v4/admin/auth/logout_all",
      {
        method: "POST",
        body: jsonBody({ phone_number: phoneNumber }),
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
