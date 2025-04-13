import React, { createContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType extends AuthState {
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const decoded = jwtDecode<{ id: string; role: 'admin' | 'player' }>(token);
          setUser({ id: decoded.id, role: decoded.role });
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 