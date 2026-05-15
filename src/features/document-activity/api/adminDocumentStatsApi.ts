import {
  adminApiRequest,
  authHeaders,
} from "@/features/auth/api/adminApiClient";

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

export const adminDocumentStatsApi = {
  getDownloads: async (accessToken: string, limit = 20, offset = 0) =>
    adminApiRequest<DocumentDownloadsResponse>(
      `/v4/admin/document-downloads?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: authHeaders(accessToken),
      }
    ),

  getRequests: async (accessToken: string, limit = 20, offset = 0) =>
    adminApiRequest<DocumentRequestsResponse>(
      `/v4/admin/document-requests?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: authHeaders(accessToken),
      }
    ),

  getSummary: async (accessToken: string) =>
    adminApiRequest<DocumentSummaryResponse>(
      "/v4/admin/document-stats/summary",
      {
        method: "GET",
        headers: authHeaders(accessToken),
      }
    ),
};
