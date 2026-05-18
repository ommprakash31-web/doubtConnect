import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('doubtconnect_user') || 'null'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('doubtconnect_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/auth/me');
        setUser(data);
        localStorage.setItem('doubtconnect_user', JSON.stringify(data));
      } catch (error) {
        localStorage.removeItem('doubtconnect_token');
        localStorage.removeItem('doubtconnect_user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const loginWithResponse = (data) => {
    localStorage.setItem('doubtconnect_token', data.token);
    localStorage.setItem('doubtconnect_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('doubtconnect_token');
    localStorage.removeItem('doubtconnect_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, loginWithResponse, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
