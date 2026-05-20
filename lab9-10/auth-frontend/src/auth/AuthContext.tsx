import { createContext, useContext, useEffect, useState } from 'react';

import api from '../api/axios';

type User = {
  id: number;
  email: string;
  createdAt: string;
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;

  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchMe() {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetchMe();
    } else {
      setLoading(false);
    }
  }, []);

  async function login(data: LoginData) {
    const response = await api.post('/auth/login', data);

    localStorage.setItem('token', response.data.access_token);

    await fetchMe();
  }

  async function register(data: RegisterData) {
    await api.post('/auth/register', data);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
