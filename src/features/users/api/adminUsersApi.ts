import {
  adminApiRequest,
  authHeaders,
  jsonBody,
} from "@/features/auth/api/adminApiClient";
import { LearnerUser } from "@/features/users/types/adminUsers";

type ListUsersResponse = {
  users?: LearnerUser[];
  pagination?: {
    limit: number;
    offset: number;
  };
  requested_by?: string;
};

export type UserStatsCounts = {
  total_users: number;
  active_users: number;
  inactive_users: number;
  recently_active_users_7d: number;
};

type UserStatsDefinitions = {
  active_users?: string;
  inactive_users?: string;
  recently_active_users_7d?: string;
};

type GetUserStatsResponse = {
  counts: UserStatsCounts;
  definitions?: UserStatsDefinitions;
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

export const adminUsersApi = {
  listUsers: async (accessToken: string) =>
    adminApiRequest<ListUsersResponse>("/v4/admin/users", {
      method: "GET",
      headers: authHeaders(accessToken),
    }),

  getUserStats: async (accessToken: string) =>
    adminApiRequest<GetUserStatsResponse>("/v4/admin/users/stats", {
      method: "GET",
      headers: authHeaders(accessToken),
    }),

  getUser: async (accessToken: string, waId: string) =>
    adminApiRequest<GetUserResponse>(
      `/v4/admin/users/${encodeURIComponent(waId)}`,
      {
        method: "GET",
        headers: authHeaders(accessToken),
      }
    ),

  createUser: async (accessToken: string, body: UpsertLearnerUserPayload) =>
    adminApiRequest<GetUserResponse>("/v4/admin/users", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: jsonBody(body),
    }),

  updateUser: async (
    accessToken: string,
    waId: string,
    body: Partial<UpsertLearnerUserPayload>
  ) =>
    adminApiRequest<GetUserResponse>(
      `/v4/admin/users/${encodeURIComponent(waId)}`,
      {
        method: "PATCH",
        headers: authHeaders(accessToken),
        body: jsonBody(body),
      }
    ),
};
