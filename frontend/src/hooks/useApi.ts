import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAuth } from './useAuth';
import { ApiResponse } from '../types';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_ADMIN_API_URL,
  withCredentials: true,
});

export const useApi = () => {
  const { logout } = useAuth();

  const handleError = (error: AxiosError) => {
    if (error.response?.status === 401) {
      logout();
      toast.error('Session expired. Please login again.');
    } else {
      const message = (error.response?.data as { message?: string })?.message || error.message;
      toast.error(message);
    }
    throw error;
  };

  const request = async <T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await api(config);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  return {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'GET', url }),
    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'POST', url, data }),
    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'PUT', url, data }),
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'DELETE', url }),
  };
}; 