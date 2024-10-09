// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [user, setUser] = useState(null); // 사용자 정보 저장

  // 로그인 상태가 변경될 때 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // 임시 구글 로그인 처리
  const loginWithGoogleMock = () => {
    // 이력서 없는 상태로 초기화
    const mockUserData = {
      name: "콩순이",
      email: "bean@gmail.com",
      picture: "https://url.kr/a5oja6", // 임시 프로필 사진 URL
      resumeExists: false, // 이력서 없음 (초기값)
      resume: null, // 이력서 초기값
    };

    // 로컬 스토리지에 사용자 정보 저장
    localStorage.setItem("mockUser", JSON.stringify(mockUserData));
    setUser(mockUserData);
    setIsLoggedIn(true); // 로그인 상태 true로 설정
  };

  // 이력서 등록 후 resumeExists 업데이트
  const updateResumeExists = (resumeData) => {
    if (user) {
      const updatedUser = { ...user, resumeExists: true, resume: resumeData };
      setUser(updatedUser);
      localStorage.setItem("mockUser", JSON.stringify(updatedUser)); // 로컬 스토리지에 저장
    }
  };

  // 로그아웃 처리
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("mockUser");
    setIsLoggedIn(false);
    setUser(null);
  };

  // 컴포넌트가 처음 렌더링될 때 로컬 스토리지에서 사용자 정보 가져오기
  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loginWithGoogleMock,
        updateResumeExists,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
