import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

 const login = async (email, password) => {
  const res = await api.post('/auth/login', {
    email,
    password
  });

  localStorage.setItem('token', res.data.token);
  setUser(res.data.usuario);

  return res.data.usuario; // 🔑 ESTO ES LO QUE FALTABA
};


  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
