import {
  adminApiRequest,
  authHeaders,
  jsonBody,
} from "@/features/auth/api/adminApiClient";

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

export const adminDocumentsApi = {
  presignUpload: async (accessToken: string, body: PresignUploadRequest) =>
    adminApiRequest<PresignUploadResponse>("/v4/admin/storage/presign-upload", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: jsonBody(body),
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
    adminApiRequest<AnalyzeDocumentResponse>("/v4/admin/documents/analyze", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: jsonBody(body),
    }),

  upsertDocument: async (body: UpsertDocumentRequest) =>
    adminApiRequest<UpsertDocumentResponse>("/upsert", {
      method: "POST",
      body: jsonBody(body),
    }),
};
