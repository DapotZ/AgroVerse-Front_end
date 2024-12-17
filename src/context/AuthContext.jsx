import React, { createContext, useState, useContext } from "react";

// Membuat context Auth
export const AuthContext = createContext();

// Membuat provider Auth untuk menyimpan dan mengakses data autentikasi
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
  });

  const setAuth = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthData({ token, user });
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("likedPosts");
    setAuthData({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData: setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
