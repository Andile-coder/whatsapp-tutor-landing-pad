import { AdminApiError } from "@/lib/admin-auth-api";

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

export type DocumentDownloadAggregate = {
  document_name: string;
  document_path: string;
  download_count: number;
  last_download: string;
  created_at: string;
  updated_at: string;
};

export type DocumentRequestAggregate = {
  document_name: string;
  query_text: string;
  request_count: number;
  last_request: string;
  created_at: string;
  updated_at: string;
};

export type PaginationMeta = {
  limit: number;
  offset: number;
  total: number;
};

type DocumentDownloadsResponse = {
  downloads: DocumentDownloadAggregate[];
  pagination: PaginationMeta;
  requested_by?: string;
};

type DocumentRequestsResponse = {
  requests: DocumentRequestAggregate[];
  pagination: PaginationMeta;
  requested_by?: string;
};

type DocumentSummaryResponse = {
  summary: {
    downloads: {
      total_documents: number;
      total_downloads: number;
    };
    requests: {
      total_failed_documents: number;
      total_failed_requests: number;
    };
    top_downloads: DocumentDownloadAggregate[];
    top_requests: DocumentRequestAggregate[];
  };
  requested_by?: string;
};

const extractApiError = (payload: ApiFailure | null, fallback: string) =>
  payload?.error || payload?.message || fallback;

const request = async <T>(
  path: string,
  accessToken: string
): Promise<ApiSuccess<T>> => {
  const response = await fetch(`${ADMIN_API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
      extractApiError(payload, "Request failed"),
      response.status
    );
  }

  return payload;
};

export const adminDocumentStatsApi = {
  getDownloads: async (accessToken: string, limit = 20, offset = 0) =>
    request<DocumentDownloadsResponse>(
      `/v4/admin/document-downloads?limit=${limit}&offset=${offset}`,
      accessToken
    ),

  getRequests: async (accessToken: string, limit = 20, offset = 0) =>
    request<DocumentRequestsResponse>(
      `/v4/admin/document-requests?limit=${limit}&offset=${offset}`,
      accessToken
    ),

  getSummary: async (accessToken: string) =>
    request<DocumentSummaryResponse>(
      "/v4/admin/document-stats/summary",
      accessToken
    ),
};
