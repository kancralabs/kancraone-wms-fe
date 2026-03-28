import axiosInstance from '@/lib/axios';
import type { LoginResponse, User, TokenRefreshResponse } from '@/types/auth';

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>('/auth/login/', {
      username,
      password,
    });
    return response.data;
  },

  async logout(refreshToken: string): Promise<void> {
    await axiosInstance.post('/auth/logout/', {
      refresh: refreshToken,
    });
  },

  async getCurrentUser(): Promise<User> {
    const response = await axiosInstance.get<User>('/auth/me/');
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<TokenRefreshResponse> {
    const response = await axiosInstance.post<TokenRefreshResponse>('/auth/token/refresh/', {
      refresh: refreshToken,
    });
    return response.data;
  },
};
