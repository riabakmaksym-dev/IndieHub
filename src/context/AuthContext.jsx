
import { createContext, useState } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => api.getCurrentUser());
  const [token, setToken] = useState(() => api.getToken());
  const [loading] = useState(false);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    setUser(res.user);
    setToken(res.token);
    return res;
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    setUser(res.user);
    setToken(res.token);
    return res;
  };

  const logout = () => {
    api.logout();
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (updateData) => {
    if (!user) return;
    const updatedUser = await api.updateProfile(user.id, updateData);
    setUser(updatedUser);
    return updatedUser;
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};