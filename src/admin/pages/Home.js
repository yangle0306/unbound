import React from "react";
import styled from "styled-components";

const Container = styled.section`
  width: 1076px;
  height: 87px;
  margin: 120px auto;
  display: flex;
  justify-content: space-between;
`;

const MembersContainer = styled.section`
  width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MembersBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9; /* 박스 전체에 테두리 */
  border-collapse: collapse; /* 테두리 연결 */
`;

const MessagesContainer = styled.section`
  width: 368px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MessagesBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9; /* 박스 전체에 테두리 */
  border-collapse: collapse; /* 테두리 연결 */
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1e1e1e;
  margin-bottom: auto;
`;

const Text = styled.span`
  height: 100%; /* 부모 높이에 맞춤 */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; /* 텍스트를 중앙 정렬 */
  background-color: #f8f9ff; /* 텍스트 배경색 */
  color: #1e1e1e;
  border-right: 1px solid #d9d9d9; /* 요소 사이에 선을 넣기 위한 설정 */
  &:last-child {
    border-right: none; /* 마지막 요소는 오른쪽 테두리 제거 */
  }
`;

const NumberText = styled.span`
  height: 100%; /* 부모 높이에 맞춤 */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; /* 숫자 텍스트 중앙 정렬 */
  background-color: #ffffff; /* 숫자 배경색 */
  color: #1e1e1e;
  border-right: 1px solid #d9d9d9;
`;

const Button = styled.button`
  height: 100%; /* 부모 높이에 맞춤 */
  padding: 5px 10px;
  background-color: #1e388b;
  color: #ffffff;
  cursor: pointer;
  border-left: 1px solid black; /* 버튼의 왼쪽 테두리만 설정 */
  border: none;

  transition: background-color 0.3s ease; /* 호버 시 부드러운 전환 효과 */

  &:hover {
    background-color: #3a5fb0; /* 마우스 호버 시 배경색 변경 */
  }
`;

const AdminHome = () => {
  return (
    <Container>
      <MembersContainer>
        <Title>전체 회원</Title>
        <MembersBox>
          <Text>회원 수</Text>
          <NumberText>200명</NumberText>
          <Text>신규 회원</Text>
          <NumberText>5명</NumberText>
        </MembersBox>
      </MembersContainer>
      <MessagesContainer>
        <Title>메시지</Title>
        <MessagesBox>
          <Text>신규 메시지</Text>
          <NumberText>5개</NumberText>
          <Button>바로가기</Button>
        </MessagesBox>
      </MessagesContainer>
    </Container>
  );
};

export default AdminHome;
