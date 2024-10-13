import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // 로그인 상태 확인을 위한 useUser 훅
import Modal from "./Modal";
import ResumeNotRegistered from "./ResumeNotRegistered";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUser(); // 로그인 상태와 로딩 상태 가져오기
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation(); // 현재 위치 확인
  const navigate = useNavigate(); // 이전 경로로 돌아가기 위해 useNavigate 사용

  useEffect(() => {
    // '/file/upload' 또는 '/url/upload' 경로에서만 API 호출
    if (
      location.pathname === "/file/upload" ||
      location.pathname === "/url/upload"
    ) {
      if (user) {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/api/me`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.accessToken}`, // idToken을 Authorization 헤더에 포함
                },
              }
            );

            const result = await response.json();

            // 'name' 또는 'birth' 값이 비어 있는지 확인
            if (!result.name || !result.birth) {
              setModalOpen(true); // 값이 없으면 모달 띄우기
            }
          } catch (error) {
            console.error("API 호출 오류:", error);
          }
        };

        fetchData();
      }
    }
  }, [location.pathname, user]);

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setModalOpen(false); // 모달을 닫음

    const prevPath = location.state?.from?.pathname; // 이전 경로 확인

    // 이전 경로가 '/' 또는 '/mypage'이면 그 경로로, 아니면 '/'로 이동
    if (prevPath === "/" || prevPath === "/mypage") {
      navigate(prevPath);
    } else {
      navigate("/"); // 기본 경로 '/'로 이동
    }
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중이면 로딩 표시
  }

  if (!user) {
    // 로그인 안 된 경우 /login 페이지로 이동하면서 현재 경로를 상태로 전달
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <>
      {/* 모달이 열려 있을 때는 children을 렌더링하지 않음 */}
      {isModalOpen ? (
        <Modal isOpen={isModalOpen}>
          <ResumeNotRegistered onClose={handleModalClose} />
        </Modal>
      ) : (
        children
      )}
    </>
  );
};

export default PrivateRoute;
