import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal"; // 모달 컴포넌트 임포트
import GoogleLogin from "./GoogleLogin";

// 전체 컨테이너 스타일 정의
const Container = styled.div`
  width: 1260px;
  height: 92px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 20px auto 0;
  border-radius: 15px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// 왼쪽 섹션 스타일 정의
const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

// 인트로 메시지 스타일
const Intro = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin-right: 60px;
`;

// 강조된 텍스트 스타일
const Highlight = styled.span`
  color: #1e388b;
`;

// 로그인 메시지 스타일
const Message = styled.p`
  font-size: 15px;
  color: #838383;
  margin: 0;
`;

// 버튼 스타일
const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #3f5ba9;
  }
`;

const LoginPrompt = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Container>
        <LeftSection>
          <Intro>
            안녕하세요:) <Highlight>SeeToGo</Highlight>입니다.
          </Intro>
          <Message>SeeToGo 구글 간편 로그인으로 이용이 가능합니다.</Message>
        </LeftSection>
        <Button onClick={() => setModalOpen(true)}>로그인</Button>
      </Container>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <GoogleLogin onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  );
};

export default LoginPrompt;
