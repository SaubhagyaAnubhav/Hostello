import { createContext, useState, useEffect, useContext } from 'react';
import {
  login as loginApi,
  register as registerApi,
  getMe,
  updateProfile as updateProfileApi,
} from '../services/api';

const AuthContext = createContext();

const USER_STORAGE_KEY = 'auth_user';

const readStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const saveStoredUser = (user) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

const clearStoredAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem(USER_STORAGE_KEY);
};

const normalizeUser = (payload) => {
  if (!payload) return null;

  
  if (payload.user && typeof payload.user === 'object') {
    return payload.user;
  }

  
  return payload;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readStoredUser());
  const [loading, setLoading] = useState(() => {
    const token = localStorage.getItem('token');
    const cachedUser = readStoredUser();
    return Boolean(token && !cachedUser);
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    const cachedUser = readStoredUser();

    
    if (cachedUser) {
      setUser(cachedUser);
      setLoading(false);
    }

    const refreshUser = async () => {
      try {
        if (!cachedUser) {
          setLoading(true);
        }

        const userData = await getMe();
        const normalizedUser = normalizeUser(userData);

        setUser(normalizedUser);
        saveStoredUser(normalizedUser);
      } catch (error) {
        console.error('Failed to load user', error);
        clearStoredAuth();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    refreshUser();
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);

    if (data?.token) {
      localStorage.setItem('token', data.token);
    }

    const normalizedUser = normalizeUser(data);
    setUser(normalizedUser);
    saveStoredUser(normalizedUser);

    return data;
  };

  const register = async (userData) => {
    const data = await registerApi(userData);

    if (data?.token) {
      localStorage.setItem('token', data.token);
    }

    const normalizedUser = normalizeUser(data);
    setUser(normalizedUser);
    saveStoredUser(normalizedUser);

    return data;
  };

  const updateProfile = async (profileData) => {
    const updatedData = await updateProfileApi(profileData);
    const normalizedUser = normalizeUser(updatedData);

    setUser(normalizedUser);
    saveStoredUser(normalizedUser);

    return updatedData;
  };

  const logout = () => {
    clearStoredAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);