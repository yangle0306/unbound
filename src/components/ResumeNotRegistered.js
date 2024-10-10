import React from "react";
import styled from "styled-components";

const ResumeNotRegisteredContainer = styled.div`
  width: 500px;
  height: 272px;
  background-color: #ffffff; /* 배경색 설정 */
  border-radius: 20px; /* 둥근 모서리 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  padding: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; /* 부모 요소 안에서 전체 높이 */
`;

const MessageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #1e388b;
`;

const MessageText = styled.p`
  font-size: 15px;
  color: #313131;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 100%;
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

function ResumeNotRegistered({ onClose }) {
  return (
    <ResumeNotRegisteredContainer>
      <TextContainer>
        <MessageTitle>이력서를 등록하지 않았습니다.</MessageTitle>
        <MessageText>
          이력서를 등록하지않아 서비스 이용이 불가능합니다.
        </MessageText>
      </TextContainer>
      <Button onClick={onClose}>확인</Button>
    </ResumeNotRegisteredContainer>
  );
}

export default ResumeNotRegistered;
