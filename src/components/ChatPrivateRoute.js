import React, { useContext, useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal";
import NoEntryMessage from "./NoEntryMessage";

const ChatPrivateRoute = ({ children }) => {
  const { user, isLoggedIn } = useContext(AuthContext); // 로그인 상태 확인
  const location = useLocation(); // 현재 위치 확인
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달을 열 조건을 확인하고 상태 업데이트
  useEffect(() => {
    // user가 존재하고, appliedCompanies가 0개일 때 모달을 열음
    if (user && user.appliedCompanies.length === 0) {
      setModalOpen(true); // 모달을 열기 위한 상태 업데이트
    } else {
      setModalOpen(false); // 모달을 닫음
    }
  }, [user]);

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate(-1); // 이전 페이지로 이동
  };

  // 로그인이 안 되어 있을 때는 로그인 페이지로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <>
      {/* 모달이 열려 있을 때는 children을 렌더링하지 않음 */}
      {isModalOpen ? (
        <Modal isOpen={isModalOpen}>
          <NoEntryMessage onClose={handleCloseModal} />
        </Modal>
      ) : (
        children
      )}
    </>
  );
};

export default ChatPrivateRoute;
