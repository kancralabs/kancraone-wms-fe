import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import type { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const accessToken = localStorage.getItem('access_token');

      if (storedUser && accessToken) {
        try {
          // Validate token by fetching current user
          const user = await authService.getCurrentUser();
          setUser(user);
        } catch (error) {
          // Token invalid, clear storage
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
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
      
      // Demo mode - untuk testing tanpa backend
      // Hapus kode ini dan uncomment kode API di bawah jika sudah ada backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi delay
      
      if (username === 'admin' && password === 'admin') {
        const demoUser: User = {
          id: '1',
          username: 'admin',
          email: 'admin@kancralabs.com',
          fullName: 'Administrator',
          role: 'Admin',
        };
        const demoToken = 'demo-token-12345';
        
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        setUser(demoUser);
        navigate('/');
      } else {
        throw new Error('Invalid credentials');
      }

      /* Uncomment kode ini jika sudah ada backend API
      const response = await axiosInstance.post<LoginResponse>('/auth/login', {
        username,
        password,
      });

      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/');
      */
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
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
