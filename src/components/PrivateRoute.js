import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext"; // 로그인 상태 확인을 위한 useUser 훅

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUser(); // 로그인 상태와 로딩 상태 가져오기
  const location = useLocation(); // 현재 위치 확인

  if (loading) {
    return null; // 로딩 중이면 null 처리..
  }

  if (!user) {
    // 로그인 안 된 경우 /login 페이지로 이동하면서 현재 경로를 상태로 전달
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
