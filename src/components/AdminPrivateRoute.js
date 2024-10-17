import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// 보호된 경로 컴포넌트
const AdminPrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 인증 여부 상태
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    if (isAuthenticated) return;

    const verifyToken = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/employees`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setIsAuthenticated(data.success);
        if (!data.success) {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("토큰 검증 실패:", error);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    };

    verifyToken();
  }, [token, isAuthenticated]);

  if (isAuthenticated === null) {
    // 검증 중일 때 아무것도 표시안함
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
