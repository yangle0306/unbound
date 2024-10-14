// LoadingOverlay.js
import React from "react";
import styled, { keyframes } from "styled-components";

// 통통 튀는 애니메이션 정의
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

// 전체 화면 덮는 오버레이 스타일
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9); /* 흰색 배경에 약간의 투명도 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 화면의 맨 위에 나타나도록 설정 */
`;

// 개별 글자에 적용되는 스타일 (각 글자마다 bounce 애니메이션 적용)
const LoadingLetter = styled.span`
  font-size: 48px;
  font-weight: bold;
  color: #000000;
  display: inline-block;
  animation: ${bounce} 1.5s infinite;
  animation-delay: ${({ $delay }) => $delay}; /* Transient prop 사용 */
  margin: 0 5px;
`;

const LoadingOverlay = () => {
  return (
    <Overlay>
      <LoadingLetter $delay="0s">L</LoadingLetter>
      <LoadingLetter $delay="0.1s">o</LoadingLetter>
      <LoadingLetter $delay="0.2s">a</LoadingLetter>
      <LoadingLetter $delay="0.3s">d</LoadingLetter>
      <LoadingLetter $delay="0.4s">i</LoadingLetter>
      <LoadingLetter $delay="0.5s">n</LoadingLetter>
      <LoadingLetter $delay="0.6s">g</LoadingLetter>
      <LoadingLetter $delay="0.7s">.</LoadingLetter>
      <LoadingLetter $delay="0.8s">.</LoadingLetter>
      <LoadingLetter $delay="0.9s">.</LoadingLetter>
    </Overlay>
  );
};

export default LoadingOverlay;
