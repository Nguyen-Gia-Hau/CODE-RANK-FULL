import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    accessToken: localStorage.getItem('accessToken') || null,
  });



  const login = (token, username, role) => {
    setAuth({
      isAuthenticated: true,
      accessToken: token,
    });
    localStorage.setItem('accessToken', token);
    localStorage.setItem('username', username)
    localStorage.setItem('role', role)
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      accessToken: null,
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
