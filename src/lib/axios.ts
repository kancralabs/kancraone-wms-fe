import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { tokenCookies } from './cookies';

// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const TIMEOUT = 30000; // 30 seconds

// Token refresh queue to handle concurrent requests
let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Enable cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get access token from cookies
    const token = tokenCookies.getAccessToken();

    // Add authorization token to request headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('🚀 Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    // Log error in development
    if (import.meta.env.DEV) {
      console.error('❌ Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('✅ Response:', {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('❌ Response Error:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Handle different error scenarios
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Don't retry if this IS the refresh token request
          if (originalRequest.url?.includes('/auth/token/refresh/')) {
            handleLogout();
            return Promise.reject(error);
          }

          if (!originalRequest._retry) {
            if (isRefreshing) {
              // Add to queue if refresh already in progress
              return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
              })
                .then((token) => {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  return axiosInstance(originalRequest);
                })
                .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = tokenCookies.getRefreshToken();

            if (!refreshToken) {
              handleLogout();
              return Promise.reject(error);
            }

            try {
              const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
                refresh: refreshToken,
              });

              const { access, refresh: newRefresh } = response.data;

              tokenCookies.setAccessToken(access);

              // Handle token rotation
              if (newRefresh) {
                tokenCookies.setRefreshToken(newRefresh);
              }

              axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
              originalRequest.headers.Authorization = `Bearer ${access}`;

              processQueue(null, access);
              isRefreshing = false;

              return axiosInstance(originalRequest);
            } catch (refreshError) {
              processQueue(refreshError as Error, null);
              isRefreshing = false;
              handleLogout();
              return Promise.reject(refreshError);
            }
          }

          handleLogout();
          break;

        case 403:
          // Forbidden - User doesn't have permission
          console.error('Access forbidden. You do not have permission to access this resource.');
          break;

        case 404:
          // Not Found
          console.error('Resource not found.');
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors
          console.error('Server error. Please try again later.');
          break;

        default:
          console.error('An error occurred:', error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server. Please check your internet connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Helper function to handle logout
function handleLogout() {
  tokenCookies.clearTokens();
  localStorage.removeItem('user'); // Keep user in localStorage for now

  // Redirect to login page
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
}

// API helper methods
export const api = {
  // GET request
  get: <T = any>(url: string, config = {}) => {
    return axiosInstance.get<T>(url, config);
  },

  // POST request
  post: <T = any>(url: string, data = {}, config = {}) => {
    return axiosInstance.post<T>(url, data, config);
  },

  // PUT request
  put: <T = any>(url: string, data = {}, config = {}) => {
    return axiosInstance.put<T>(url, data, config);
  },

  // PATCH request
  patch: <T = any>(url: string, data = {}, config = {}) => {
    return axiosInstance.patch<T>(url, data, config);
  },

  // DELETE request
  delete: <T = any>(url: string, config = {}) => {
    return axiosInstance.delete<T>(url, config);
  },
};

export default axiosInstance;
