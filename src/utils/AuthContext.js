// src/utils/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('loggedIn') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
 
  const login = (username, userRole) => {
    setIsAuthenticated(true);
    setUsername(username);
    setUserRole(userRole);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('userRole', userRole);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setUserRole('');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


