import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as GoogleIcon } from "../assets/google.svg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"; // Firebase 설정 파일

// 로그인 페이지의 메인 컨테이너 (화면 중앙 배치)
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체의 높이를 차지하여 중앙 배치 */
`;

// GoogleLogin 모달 스타일 (크기와 중앙 위치 설정)
const GoogleLoginContainer = styled.div`
  width: 500px;
  height: 376px;
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* 요소를 상단과 중앙, 하단에 배치 */
  position: relative;
`;

// 닫기 버튼 스타일 정의
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const GoogleLoginButton = styled.button`
  width: 100%;
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

  &:hover {
    background-color: #3f5ba9;
  }
`;

const LoginMessage = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  text-align: left; /* 메시지를 좌측 정렬 */
  width: 100%; /* 너비를 100%로 설정하여 좌측에 붙도록 */
  margin-bottom: 20px;
  line-height: 1.5; /* 줄 간격을 조정 */
`;

const Highlight = styled.span`
  color: #1e388b;
`;

const GoogleLogin = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치를 기억
  const from = location.state?.from?.pathname || "/"; // 이전 경로, 없으면 기본값 '/'

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;

      // Firebase에서 idToken 가져오기
      const idToken = await user.getIdToken(); // idToken을 가져오는 비동기 함수

      console.log("Firebase ID Token:", idToken);

      // 서버로 사용자 정보를 전송하여 가입 또는 로그인 처리
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`, // idToken을 Authorization 헤더에 포함
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("로그인 성공:", data);
        // 로그인이 성공하면 원하는 페이지로 이동
        navigate(from, { replace: true }); // 로그인 후 이전 경로로 이동
      } else {
        console.error("로그인 실패:", data);
      }
    } catch (error) {
      console.error("구글 로그인 실패:", error);
    }
  };

  return (
    <LoginContainer>
      <GoogleLoginContainer>
        {/* 닫기 버튼 */}
        <CloseButton onClick={onClose}>&times;</CloseButton>

        {/* 로그인 메시지 (최상단) */}
        <LoginMessage>
          <Highlight>SeeToGo</Highlight>를 이용하시려면
          <br /> <Highlight>로그인</Highlight>이 필요합니다.
        </LoginMessage>

        {/* 구글 아이콘 (중앙) */}
        <StyledGoogleIcon />

        {/* 로그인 버튼 (최하단) */}
        <GoogleLoginButton onClick={signInWithGoogle}>
          구글 로그인
        </GoogleLoginButton>
      </GoogleLoginContainer>
    </LoginContainer>
  );
};

export default GoogleLogin;
