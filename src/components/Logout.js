import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

// Logout 컴포넌트 스타일 정의
const LogoutContainer = styled.div`
  width: 500px;
  height: 272px;
  padding: 20px;
  background-color: #ffffff; /* 하얀색 배경 */
  border-radius: 20px; /* 둥근 직사각형 모양 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 가벼운 그림자 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; /* 부모 요소 안에서 전체 높이 */
`;

const LogoutTitle = styled.h1`
  font-size: 24px;
  font-weight: bold; /* 볼드체 */
  color: #1e388b;
  margin-bottom: 10px; /* 텍스트 사이 간격 */
`;

const LogoutMessage = styled.p`
  font-size: 15px;
  font-weight: normal; /* 레귤러 폰트 */
  color: #313131;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px; /* 버튼 사이 간격 */
  justify-content: center;
`;

const LogoutButton = styled.button`
  width: 205px;
  height: 45px;
  background-color: #1e388b; /* 확인 버튼 색상 */
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold; /* 볼드체 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 그림자 적용 */

  &:hover {
    background-color: #3f5ba9;
  }
`;

const CancelButton = styled.button`
  width: 205px;
  height: 45px;
  background-color: #d9d9d9; /* 아니오 버튼 색상 */
  color: black;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold; /* 볼드체 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 그림자 적용 */

  &:hover {
    background-color: #b3b3b3;
  }
`;

const Logout = ({ onClose }) => {
  const { logout } = useContext(AuthContext); // logout 함수 가져오기

  const handleLogout = () => {
    logout(); // 로그아웃 처리
    alert("로그아웃 되었습니다!"); // 로그아웃 버튼 클릭 시 동작
    onClose(); // 로그아웃 후 모달 닫기
  };

  const handleCancel = () => {
    onClose(); // "아니오" 클릭 시 모달 닫기
  };

  return (
    <LogoutContainer>
      <TextContainer>
        <LogoutTitle>로그아웃</LogoutTitle>
        <LogoutMessage>로그아웃 하시겠습니까?</LogoutMessage>
      </TextContainer>
      <ButtonContainer>
        <CancelButton onClick={handleCancel}>아니오</CancelButton>
        <LogoutButton onClick={handleLogout}>확인</LogoutButton>
      </ButtonContainer>
    </LogoutContainer>
  );
};

export default Logout;
