// src/context/AuthContext.jsx
// Context makes the logged-in user's info available
// to ANY component in the app without prop drilling

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Check localStorage on first load so login persists
  // across page refreshes
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  function login(tokenValue, userData) {
    // Save to state AND localStorage (survives page refresh)
    setToken(tokenValue);
    setUser(userData);
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — any component can call useAuth() to get token/user/login/logout
export function useAuth() {
  return useContext(AuthContext);
}
