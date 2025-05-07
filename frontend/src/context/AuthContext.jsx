// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("token");
    }
    return null;
  });

  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem("user");

        // Vérifie que storedUser est valide
        if (storedUser && storedUser !== "undefined") {
          return JSON.parse(storedUser);
        }

        // Si la valeur est invalide, la supprimer pour éviter les problèmes futurs
        if (storedUser === "undefined") {
          localStorage.removeItem("user");
        }

      } catch (e) {
        console.error("Erreur lors du parsing de l'utilisateur :", e);
        localStorage.removeItem("user");
      }
    }
    return null;
  });

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthToken(token);
    setUser(userData);
  };

  const register = login; // Réutilisation de login

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
