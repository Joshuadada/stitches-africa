import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getToken() {
  const authState = useAuthStore.getState();
  return authState.user?.accessToken || "";
}

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// ─── Request Interceptor ───────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Axios sets Content-Type automatically for FormData, so only set it for non-FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response.data, // unwrap data automatically
  (error: AxiosError) => {
    const status = error.response?.status;
    const errorData = error.response?.data;

    if (status === 401) {
      localStorage.clear();
      // location.replace("/");
    }

    return Promise.reject(errorData); // throw the same shape as before
  }
);

// ─── HTTP Methods ─────────────────────────────────────────────────────────────
export async function get<T>(url: string): Promise<T> {
  return axiosInstance.get(url);
}

export async function post<T>(url: string, body: any): Promise<T> {
  return axiosInstance.post(url, body);
}

export async function put<T>(url: string, body: any): Promise<T> {
  return axiosInstance.put(url, body);
}

export async function patch<T>(url: string, body: any): Promise<T> {
  return axiosInstance.patch(url, body);
}

export async function deleteRequest<T>(url: string): Promise<T> {
  return axiosInstance.delete(url);
}