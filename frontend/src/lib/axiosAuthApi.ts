import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default authApi;
