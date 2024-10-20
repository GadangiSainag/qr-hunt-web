import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";


// Success interceptor function
export const responseInterceptor = (response: AxiosResponse) => {
  // Handle successful responses
  return response;
}; 

// Error interceptor function
export const errorInterceptor = async (error: AxiosError) => {
  if (!error.response) {
    return Promise.reject(error); // Non-response errors (network, timeout)
  }

  const originalRequest = error.config as AxiosRequestConfig & {
    _retry?: boolean;
  };
  const refreshedToken = localStorage.getItem("accessToken");

  if (
    error.response.status === 401 &&  !originalRequest._retry &&
    refreshedToken
  ) {
    originalRequest._retry = true;

    try {
      const refreshResponse = await axios.post("/refresh-token", {
        refreshToken: refreshedToken,
      });
      const newAccessToken = refreshResponse.data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);

      // Retry the original request with the new access token
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      return axios(originalRequest);
    } catch (err) {
      console.error("Refresh token failed:", err);
      // Handle refresh token failure (e.g., logout user)
      
    }
  }

  return Promise.reject(error); // Reject other errors
};


