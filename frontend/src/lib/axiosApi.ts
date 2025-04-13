import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Automatically prefixed
  withCredentials: true, // Optional: if you’re using cookies/auth
});

export default api;
