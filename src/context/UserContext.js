import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// UserContext 생성
const UserContext = createContext();

// UserProvider 컴포넌트: 로그인 상태를 전역으로 제공
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // 로딩 완료
    });

    return () => unsubscribe(); // 언마운트 시 리스너 해제
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// useUser 훅: 로그인 상태를 쉽게 사용하기 위해 제공
export const useUser = () => useContext(UserContext);
