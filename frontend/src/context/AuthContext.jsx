import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    username: null,
    role: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('jsb_auth_token');
    const username = localStorage.getItem('jsb_auth_user');
    const role = localStorage.getItem('jsb_auth_role');

    if (token && username && role) {
      setAuthState({
        token,
        username,
        role,
        loading: false,
      });
      // Set default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      setAuthState({
        token: null,
        username: null,
        role: null,
        loading: false,
      });
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      const { token, role } = response.data;

      localStorage.setItem('jsb_auth_token', token);
      localStorage.setItem('jsb_auth_user', response.data.username);
      localStorage.setItem('jsb_auth_role', role);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setAuthState({
        token,
        username: response.data.username,
        role,
        loading: false,
      });

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      const message = error.response?.data?.message || 'Invalid username or password';
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('jsb_auth_token');
    localStorage.removeItem('jsb_auth_user');
    localStorage.removeItem('jsb_auth_role');

    delete axios.defaults.headers.common['Authorization'];

    setAuthState({
      token: null,
      username: null,
      role: null,
      loading: false,
    });
  };

  const value = {
    ...authState,
    login,
    logout,
    isAuthenticated: !!authState.token && authState.role === 'ROLE_ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
