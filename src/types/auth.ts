export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  is_active?: boolean;
  is_staff?: boolean;
  date_joined?: string;
  last_login?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface TokenRefreshResponse {
  access: string;
  refresh?: string;
}

export interface ApiError {
  detail?: string;
  message?: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
