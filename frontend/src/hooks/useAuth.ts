import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User } from '../types';

export const useAuth = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, isAuthenticated, loading } = context;

  const logout = () => {
    // Clear tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Reset auth state
    context.setUser(null);
    context.setIsAuthenticated(false);
    // Redirect to login
    navigate('/login');
  };

  const updateUser = (userData: User) => {
    context.setUser(userData);
    context.setIsAuthenticated(true);
  };

  return {
    user,
    isAuthenticated,
    loading,
    logout,
    updateUser,
  };
}; 