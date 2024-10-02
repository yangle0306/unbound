import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal"; // 모달 컴포넌트 임포트
import GoogleLogin from "./GoogleLogin";

// 로그인 유도 컴포넌트 스타일 정의
const LoginPromptContainer = styled.div`
  width: 100%;
  max-width: 1260px;
  height: 92px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 20px auto 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// 왼쪽 영역 (IntroMessage와 LoginMessage를 함께 배치)
const LeftSection = styled.div`
  display: flex;
  align-items: center; /* 수직 정렬 */
`;

// 인트로 메시지 스타일
const IntroMessage = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-right: 60px; /* 두 텍스트 사이에 약간의 간격 */
`;

// 언바운드만 다른 색으로 스타일 적용
const Highlight = styled.span`
  color: #1e388b;
`;

// 로그인 메시지 스타일
const LoginMessage = styled.p`
  font-size: 15px; /* 폰트 크기 15px */
  font-weight: normal; /* 레귤러 폰트(기본 굵기) */
  color: #838383; /* 글자 색상 #838383 */
  margin: 0; /* 기본 margin 제거 */
`;

// 로그인 버튼 스타일
const LoginButton = styled.button`
  background: none; /* 배경 제거 */
  border: none; /* 테두리 제거 */
  padding: 0; /* 패딩 제거 */
  font-size: 16px;
  cursor: pointer; /* 텍스트도 클릭 가능 */
  transition: color 0.3s ease;

  &:hover {
    color: #3f5ba9; /* 호버 시 색상 변화 */
  }
`;

const LoginPrompt = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <LoginPromptContainer>
        <LeftSection>
          {/* 인트로 메시지와 로그인 메시지를 한 영역에 넣음 */}
          <IntroMessage>
            안녕하세요:) <Highlight>언바운드</Highlight>입니다.
          </IntroMessage>
          <LoginMessage>
            언바운드 구글 간편 로그인으로 이용이 가능합니다.
          </LoginMessage>
        </LeftSection>
        <LoginButton onClick={() => setModalOpen(true)}>로그인</LoginButton>
      </LoginPromptContainer>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {/* GoogleLogin 컴포넌트에 onClose를 전달 */}
        <GoogleLogin onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  );
};

export default LoginPrompt;
