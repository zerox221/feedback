import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:4000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Don't refresh for requests explicitly marked as public
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.skipAuthRefresh
    ) {
      return Promise.reject(error);
    }

    // Don't try to refresh these endpoints
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/verify") ||
      originalRequest.url?.includes("/m/")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshApi.get("/auth/refresh-token");

      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);
export default api;
