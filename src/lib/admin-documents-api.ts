import { AdminApiError } from "@/lib/admin-auth-api";

const ADMIN_API_BASE_URL = (
  import.meta.env.VITE_ADMIN_API_BASE_URL || "http://127.0.0.1:3000"
).replace(/\/$/, "");

type ApiSuccess<T> = T & { success: true };
type ApiFailure = {
  success?: false;
  error?: string;
  message?: string;
};

type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

type PresignUploadRequest = {
  filename: string;
  folder: string;
  content_type: string;
};

type AnalyzeDocumentRequest = {
  path: string;
};

export type PresignUploadResponse = {
  bucket: string;
  key: string;
  path: string;
  upload_url: string;
  method: string;
  content_type: string;
  expires_in: number;
};

export type UpsertDocumentRequest = {
  document_type: string;
  path: string;
  description?: string;
  year?: string;
  grade?: string;
  subject?: string;
  paper?: string;
  language?: string;
  publisher?: string;
  province?: string;
  term?: string;
} & Record<string, string | string[]>;

export type UpsertDocumentResponse = {
  vector_id: string;
  message: string;
};

export type AnalyzeDocumentResponse = {
  document: {
    path: string;
    filename: string;
    title?: string | null;
    summary?: string | null;
    document_type?: string | null;
    subject?: string | null;
    grade?: string | null;
    year?: string | null;
    language?: string | null;
    paper?: string | null;
    term?: string | null;
    province?: string | null;
    publisher?: string | null;
    exam_type?: string | null;
    keywords?: string[];
    warnings?: string[];
  };
  requested_by?: string;
};

const extractApiError = (payload: ApiFailure | null, fallback: string) =>
  payload?.error || payload?.message || fallback;

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
      extractApiError(payload, "Request failed"),
      response.status
    );
  }

  return payload;
};

export const adminDocumentsApi = {
  presignUpload: async (accessToken: string, body: PresignUploadRequest) =>
    request<PresignUploadResponse>("/v4/admin/storage/presign-upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    }),

  uploadToPresignedUrl: async (uploadUrl: string, contentType: string, file: File) => {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file to storage");
    }
  },

  analyzeDocument: async (
    accessToken: string,
    body: AnalyzeDocumentRequest
  ) =>
    request<AnalyzeDocumentResponse>("/v4/admin/documents/analyze", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    }),

  upsertDocument: async (body: UpsertDocumentRequest) =>
    request<UpsertDocumentResponse>("/upsert", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
