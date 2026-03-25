import { AdminApiError } from "@/lib/admin-auth-api";
import { LearnerUser } from "@/types/admin-users";

const ADMIN_API_BASE_URL = (
  import.meta.env.VITE_ADMIN_API_BASE_URL || "http://127.0.0.1:3000"
).replace(/\/$/, "");

type ApiFailure = {
  success?: false;
  error?: string;
  message?: string;
};

type ApiSuccess<T> = T & { success: true };
type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

type ListUsersResponse = {
  users?: LearnerUser[];
  pagination?: {
    limit: number;
    offset: number;
  };
  requested_by?: string;
};

type GetUserResponse = {
  user: LearnerUser;
  requested_by?: string;
};

export type UpsertLearnerUserPayload = {
  wa_id: string;
  phone: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  date_of_birth?: string;
  grade?: string;
  province?: string;
  city?: string;
  district_name?: string;
  school_name?: string;
  role?: string;
  accepted_terms?: boolean;
  accepted_privacy_policy?: boolean;
  viewed_terms?: boolean;
  viewed_privacy_policy?: boolean;
  terms_version?: string;
  privacy_version?: string;
  is_active?: boolean;
};

const extractApiError = (payload: ApiFailure | null, fallback: string) =>
  payload?.error || payload?.message || fallback;

const request = async <T>(
  path: string,
  accessToken: string,
  init?: RequestInit
): Promise<ApiSuccess<T>> => {
  const response = await fetch(`${ADMIN_API_BASE_URL}${path}`, {
    method: init?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...(init?.headers || {}),
    },
    body: init?.body,
  });

  let payload: ApiResponse<T> | null = null;

  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.success) {
    throw new AdminApiError(
      extractApiError(payload, "Request failed"),
      response.status
    );
  }

  return payload;
};

export const adminUsersApi = {
  listUsers: async (accessToken: string) =>
    request<ListUsersResponse>("/v4/admin/users", accessToken),

  getUser: async (accessToken: string, waId: string) =>
    request<GetUserResponse>(
      `/v4/admin/users/${encodeURIComponent(waId)}`,
      accessToken
    ),

  createUser: async (accessToken: string, body: UpsertLearnerUserPayload) =>
    request<GetUserResponse>("/v4/admin/users", accessToken, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateUser: async (
    accessToken: string,
    waId: string,
    body: Partial<UpsertLearnerUserPayload>
  ) =>
    request<GetUserResponse>(
      `/v4/admin/users/${encodeURIComponent(waId)}`,
      accessToken,
      {
        method: "PATCH",
        body: JSON.stringify(body),
      }
    ),
};
