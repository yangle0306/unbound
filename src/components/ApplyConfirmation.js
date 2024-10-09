import React from "react";
import styled from "styled-components";
import ApplyConfirmationSVG from "../assets/applyconfirmation.svg"; // SVG 파일을 불러옵니다.
import { useNavigate } from "react-router-dom";

// 500x272 크기의 둥근 직사각형 컨테이너
const ConfirmationContainer = styled.div`
  width: 500px;
  height: 272px;
  background-color: #ffffff;
  border-radius: 20px; /* 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

// 텍스트와 이미지를 감싸는 컨테이너
const TextAndImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* 텍스트와 이미지 사이의 간격 */
  margin-bottom: 20px;
`;

// 104x104 크기의 이미지 스타일
const ConfirmationImage = styled.img`
  width: 104px;
  height: 104px;
`;

// "지원되었습니다" 텍스트 스타일
const ConfirmationText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #1e388b;
  text-align: left;
`;

// 추가 메시지 텍스트 스타일
const AdditionalMessageText = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #838383;
  margin-top: 10px;
`;

// 확인 버튼 스타일
const ConfirmButton = styled.button`
  margin-top: 20px;
  width: 460px;
  height: 45px;
  background-color: #1e388b;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #3f5ba9;
  }
`;

const ApplyConfirmation = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  // 확인 버튼 클릭 시 루트로 이동
  const handleConfirm = () => {
    navigate("/"); // 루트로 이동
  };

  return (
    <ConfirmationContainer>
      {/* 텍스트와 이미지를 같은 줄에 배치 */}
      <TextAndImageContainer>
        <ConfirmationImage src={ApplyConfirmationSVG} alt="확인 이미지" />
        <div>
          <ConfirmationText>지원되었습니다</ConfirmationText>
          <AdditionalMessageText>
            담당자 배정 후 연락드리겠습니다.
          </AdditionalMessageText>
        </div>
      </TextAndImageContainer>

      {/* 확인 버튼 */}
      <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
    </ConfirmationContainer>
  );
};

export default ApplyConfirmation;
