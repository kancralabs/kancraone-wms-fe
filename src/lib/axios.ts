import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const TIMEOUT = 30000; // 30 seconds

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Set to true if you need cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
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
          // Unauthorized - Token expired or invalid
          if (!originalRequest._retry) {
            originalRequest._retry = true;

            // Try to refresh token
            try {
              const refreshToken = localStorage.getItem('refreshToken');
              
              if (refreshToken) {
                // Uncomment when you have refresh token endpoint
                // const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                //   refreshToken,
                // });
                // const { token } = response.data;
                // localStorage.setItem('token', token);
                // originalRequest.headers.Authorization = `Bearer ${token}`;
                // return axiosInstance(originalRequest);
              }
            } catch (refreshError) {
              // Refresh token failed, logout user
              handleLogout();
              return Promise.reject(refreshError);
            }
          }

          // If retry failed or no refresh token, logout
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
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  
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
