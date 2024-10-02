import React, { createContext, useState } from "react";

// Context 생성
export const AuthContext = createContext();

// Context Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const login = () => {
    setIsLoggedIn(true); // 로그인 상태 true
  };

  const logout = () => {
    setIsLoggedIn(false); // 로그아웃 처리 (로그인 상태 false)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
