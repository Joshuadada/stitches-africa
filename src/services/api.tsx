import { useAuthStore } from "@/store/auth";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getToken() {
  const authState = useAuthStore.getState();

  // if (authState.userType === "individual") {
  //   return authState.user?.accessToken || "";
  // } else if (authState.userType === "business") {
  //   return authState.businessUser?.accessToken || "";
  // }

  return authState.user?.accessToken || "";
}

// Generic Fetch Function
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const isFormData = options?.body instanceof FormData;

  // Explicitly define headers object as a Record<string, string>
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  // Merge in additional headers if provided
  if (options?.headers) {
    Object.assign(headers, options.headers);
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorResponse = await res.json();

    if (res.status === 401) {
      localStorage.clear();
      location.replace("/");
    }

    throw errorResponse;
  }

  return res.json();
}

// GET
export async function get<T>(url: string): Promise<T> {
  return request<T>(url);
}

// POST
export async function post<T>(url: string, body: any): Promise<T> {
  const isFormData = body instanceof FormData;

  return request<T>(url, {
    method: "POST",
    body: isFormData ? body : JSON.stringify(body),
    headers: isFormData ? {} : { "Content-Type": "application/json" },
  });
}

// PUT (Full Update)
export async function put<T>(url: string, body: any): Promise<T> {
  return request<T>(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// PATCH (Partial Update)
export async function patch<T>(url: string, body: any): Promise<T> {
  return request<T>(url, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

// DELETE
export async function deleteRequest<T>(url: string): Promise<T> {
  return request<T>(url, {
    method: "DELETE",
  });
}
