import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { tokenCookies } from '@/lib/cookies';
import type { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const accessToken = tokenCookies.getAccessToken();

      if (storedUser && accessToken) {
        try {
          // Validate token by fetching current user
          const user = await authService.getCurrentUser();
          setUser(user);
        } catch (error) {
          // Token invalid, clear storage
          tokenCookies.clearTokens();
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await authService.login(username, password);

      // Store tokens in cookies
      tokenCookies.setAccessToken(response.access);
      tokenCookies.setRefreshToken(response.refresh);

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(response.user));

      setUser(response.user);
      navigate('/');
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail ||
                          error.response?.data?.message ||
                          'Login failed. Please check your credentials.';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = tokenCookies.getRefreshToken();

      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens from cookies
      tokenCookies.clearTokens();

      // Clear user from localStorage
      localStorage.removeItem('user');

      setUser(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
