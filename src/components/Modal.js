import React from "react";
import styled from "styled-components";

// 모달 배경 (회색 오버레이) 스타일 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Modal 컴포넌트 정의 (배경만 제공)
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <div>{children}</div> {/* 모달 내용 표시 */}
    </ModalOverlay>
  );
};

export default Modal;
