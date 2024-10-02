import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const AuthContext = createContext();

// Context Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  // 로컬 스토리지에서 로그인 상태를 가져옴, 없으면 false로 초기화
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  // 로그인 상태가 변경될 때 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true); // 로그인 상태 true로 설정
  };

  const logout = () => {
    setIsLoggedIn(false); // 로그인 상태 false로 설정
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
