import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  CanceledError,
} from "axios";
import { useAuthStore } from "@/store/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ─── Error Types ──────────────────────────────────────────────────────────────

export type ApiErrorKind =
  | "network"      // No internet / DNS failure
  | "timeout"      // Request took too long
  | "cancelled"    // Request was aborted
  | "auth"         // 401 Unauthorized
  | "forbidden"    // 403 Forbidden
  | "not_found"    // 404 Not Found
  | "validation"   // 422 Unprocessable Entity
  | "rate_limit"   // 429 Too Many Requests
  | "server"       // 5xx Server Error
  | "client"       // Other 4xx errors
  | "unknown";     // Anything else

export interface ApiError {
  kind: ApiErrorKind;
  status?: number;
  message: string;
  errors?: Record<string, string[]>; // field-level validation errors
  raw?: unknown;                     // original server payload
}

// ─── Error Classifier ─────────────────────────────────────────────────────────

function classifyError(error: AxiosError): ApiError {
  // Request was cancelled (e.g. AbortController or axios CancelToken)
  if (error instanceof CanceledError) {
    return { kind: "cancelled", message: "Request was cancelled." };
  }

  // No response at all — network down, DNS failure, CORS preflight block, etc.
  if (!error.response) {
    if (error.code === "ECONNABORTED" || error.code === "ERR_CANCELED") {
      return { kind: "timeout", message: "Request timed out. Please try again." };
    }
    return {
      kind: "network",
      message: "Network error. Please check your internet connection.",
    };
  }

  const { status, data } = error.response;

  // Try to extract a human-readable message from whatever shape the server sends
  const serverMessage =
    (data as any)?.message ||
    (data as any)?.error ||
    (data as any)?.detail ||
    "";

  const validationErrors: Record<string, string[]> | undefined =
    (data as any)?.errors ?? (data as any)?.fieldErrors ?? undefined;

  switch (true) {
    case status === 401:
      return {
        kind: "auth",
        status,
        message: serverMessage || "Session expired. Please log in again.",
        raw: data,
      };

    case status === 403:
      return {
        kind: "forbidden",
        status,
        message: serverMessage || "You don't have permission to do that.",
        raw: data,
      };

    case status === 404:
      return {
        kind: "not_found",
        status,
        message: serverMessage || "The requested resource was not found.",
        raw: data,
      };

    case status === 422:
      return {
        kind: "validation",
        status,
        message: serverMessage || "Validation failed. Please check your input.",
        errors: validationErrors,
        raw: data,
      };

    case status === 429:
      return {
        kind: "rate_limit",
        status,
        message: serverMessage || "Too many requests. Please slow down.",
        raw: data,
      };

    case status >= 500:
      return {
        kind: "server",
        status,
        message: serverMessage || "A server error occurred. Please try again later.",
        raw: data,
      };

    case status >= 400:
      return {
        kind: "client",
        status,
        message: serverMessage || "An error occurred with your request.",
        raw: data,
      };

    default:
      return {
        kind: "unknown",
        status,
        message: serverMessage || "An unexpected error occurred.",
        raw: data,
      };
  }
}

// ─── Token Helper ─────────────────────────────────────────────────────────────

function getToken() {
  const authState = useAuthStore.getState();
  return authState?.authToken || "";
}

// ─── Axios Instance ───────────────────────────────────────────────────────────

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000, // 30 s global timeout — triggers "timeout" error kind
});

// ─── Request Interceptor ──────────────────────────────────────────────────────

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Let Axios set Content-Type automatically for FormData (includes boundary)
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const apiError = classifyError(error);

    if (apiError.kind === "auth") {
      localStorage.clear();
      // location.replace("/");
    }

    return Promise.reject(apiError); // always rejects with ApiError
  }
);

// ─── HTTP Methods ─────────────────────────────────────────────────────────────

export async function get<T>(url: string): Promise<T> {
  return axiosInstance.get(url);
}

export async function post<T>(url: string, body?: unknown): Promise<T> {
  return axiosInstance.post(url, body);
}

export async function put<T>(url: string, body?: unknown): Promise<T> {
  return axiosInstance.put(url, body);
}

export async function patch<T>(url: string, body?: unknown): Promise<T> {
  return axiosInstance.patch(url, body);
}

export async function deleteRequest<T>(url: string): Promise<T> {
  return axiosInstance.delete(url);
}

// ─── Type Guard ───────────────────────────────────────────────────────────────

/** Narrows an unknown catch value to ApiError */
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "kind" in error &&
    "message" in error
  );
}