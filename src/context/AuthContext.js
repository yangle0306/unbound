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
      appliedCompanies: [], // 지원한 기업 리스트
      uploadedFiles: [], // 파일 리스트 초기값
      registeredUrls: [], // 등록된 URL 리스트 초기값
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

  // 기업에 지원하는 함수
  const applyToCompany = (company) => {
    if (!user) return;

    const currentDate = new Date().toISOString().split("T")[0]; // 현재 날짜 (YYYY-MM-DD 형식)

    const companyWithDate = {
      ...company,
      applicationDate: currentDate, // 지원일 추가
    };

    const updatedUser = {
      ...user,
      appliedCompanies: [...user.appliedCompanies, companyWithDate], // 지원한 기업 목록에 추가
    };

    localStorage.setItem("mockUser", JSON.stringify(updatedUser));
    setUser(updatedUser); // 사용자 데이터 업데이트
  };

  // 파일 등록 함수
  const uploadFiles = (fileList) => {
    if (user) {
      // 파일 리스트를 순회하면서 Base64로 변환 (임시)
      Promise.all(
        fileList.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({ name: file.name, data: reader.result });
            reader.onerror = reject;
            reader.readAsDataURL(file); // Base64로 인코딩
          });
        })
      ).then((base64Files) => {
        const updatedUser = {
          ...user,
          uploadedFiles: [...user.uploadedFiles, ...base64Files], // Base64 파일 저장
        };
        setUser(updatedUser);
        localStorage.setItem("mockUser", JSON.stringify(updatedUser));
      });
    }
  };

  // URL 등록 함수
  const registerUrls = (urlList) => {
    if (user) {
      const updatedUser = {
        ...user,
        registeredUrls: [...user.registeredUrls, ...urlList],
      };
      setUser(updatedUser);
      localStorage.setItem("mockUser", JSON.stringify(updatedUser));
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
        applyToCompany,
        uploadFiles,
        registerUrls,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
