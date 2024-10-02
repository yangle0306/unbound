import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext); // 로그인 상태 확인
  const location = useLocation(); // 현재 위치 확인

  if (!isLoggedIn) {
    // 로그인 안 된 경우 /login 페이지로 이동하면서 현재 경로를 상태로 전달
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
