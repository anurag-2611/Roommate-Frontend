import axios from "axios";

const configuredUrl = import.meta.env.VITE_API_URL;
const serverUrl = (configuredUrl || "https://roommate-backend-1.onrender.com").replace(
  /\/$/,
  "",
);

export const API_BASE_URL = serverUrl.endsWith("/api")
  ? serverUrl
  : `${serverUrl}/api`;

export const SOCKET_URL = API_BASE_URL.replace(/\/api$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
