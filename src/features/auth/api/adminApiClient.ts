export type ApiSuccess<T> = T & { success: true };

type ApiFailure = {
  success?: false;
  error?: string;
  message?: string;
};

type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

const ADMIN_API_BASE_URL = (
  import.meta.env.VITE_ADMIN_API_BASE_URL || "http://127.0.0.1:3000"
).replace(/\/$/, "");

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

const extractApiError = (payload: ApiFailure | null, fallback: string) =>
  payload?.error || payload?.message || fallback;

const hasBody = (body: RequestInit["body"]) =>
  typeof body !== "undefined" && body !== null;

export const adminApiRequest = async <T>(
  path: string,
  init?: RequestInit
): Promise<ApiSuccess<T>> => {
  const response = await fetch(`${ADMIN_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(hasBody(init?.body) ? { "Content-Type": "application/json" } : {}),
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

export const authHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

export const jsonBody = (body: unknown) => JSON.stringify(body);
