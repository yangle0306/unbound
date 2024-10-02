import React from "react";
import styled from "styled-components";
import { ReactComponent as GoogleIcon } from "../assets/google.svg"; // google.svg 파일 임포트

// 구글 로그인 컴포넌트 스타일 정의
const GoogleLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; /* 상대적인 위치 설정 */
  width: 100%;
  height: 100%; /* 모달 안에서 중앙 배치를 위한 높이 100% */
  padding: 20px; /* 내부 패딩 추가 */
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  width: 80px; /* 아이콘 크기 */
  height: 80px;
  position: absolute; /* 정중앙 배치를 위한 절대 위치 설정 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 정중앙에 배치 */
`;

const GoogleLoginButton = styled.button`
  width: 100%; /* 모달 너비 전체에 맞춤 */
  height: 50px;
  background-color: #1e388b;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
  margin-top: auto; /* 화면 아래로 붙이기 */

  &:hover {
    background-color: #3f5ba9;
  }
`;

const LoginMessage = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  position: absolute;
  top: 20px; /* 상단에서 약간의 여백 */
  left: 20px; /* 좌측에서 약간의 여백 */
  margin: 0;
`;

const Highlight = styled.span`
  color: #1e388b;
`;

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    // 구글 로그인 처리 로직
    console.log("구글 로그인 클릭");
  };

  return (
    <GoogleLoginContainer>
      <LoginMessage>
        <Highlight>언바운드</Highlight>를 이용하시려면
        <br /> <Highlight>로그인</Highlight>이 필요합니다.
      </LoginMessage>
      <StyledGoogleIcon /> {/* 아이콘 중앙 배치 */}
      <GoogleLoginButton onClick={handleGoogleLogin}>
        구글 로그인
      </GoogleLoginButton>
    </GoogleLoginContainer>
  );
};

export default GoogleLogin;
