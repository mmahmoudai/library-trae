import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      authService.setToken(token);
      refreshMe();
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user: loggedUser, token: newToken } = await authService.login(email, password);
      setUser(loggedUser);
      setToken(newToken);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      localStorage.setItem('token', newToken);
      authService.setToken(newToken);
      return true;
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user: newUser, token: newToken } = await authService.register(name, email, password);
      setUser(newUser);
      setToken(newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', newToken);
      authService.setToken(newToken);
      return true;
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    authService.clearToken();
  };

  const refreshMe = async () => {
    try {
      const { user: me } = await authService.getMe();
      setUser(me);
      localStorage.setItem('user', JSON.stringify(me));
    } catch (_) {
      // token might be invalid; keep silent
    }
  };

  const updateProfile = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await authService.updateProfile(payload);
      setUser(updated.user);
      localStorage.setItem('user', JSON.stringify(updated.user));
      return true;
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ user, token, loading, error, login, register, logout, refreshMe, updateProfile, isAuthenticated: !!token }),
    [user, token, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);