import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 500px;
  height: 272px;
  background-color: #ffffff;
  border-radius: 15px;
  border: 1px solid #d8d7d7;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative; /* 닫기 버튼을 절대 위치로 설정하기 위해 추가 */
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1e388b;
  margin-bottom: 15px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #313131;
  text-align: center;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #555;
  }
`;

function NoEntryMessage({ onClose }) {
  return (
    <Container>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <Title>현재 엔트리한 기업이 없습니다.</Title>
      <Subtitle>메세지는 엔트리한 기업과 채팅 가능합니다.</Subtitle>
    </Container>
  );
}

export default NoEntryMessage;
