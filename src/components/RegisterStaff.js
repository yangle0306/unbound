import React from "react";
import styled from "styled-components";

// 스타일 정의
const RegisterContainer = styled.div`
  width: 1000px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin: 20px 0;
  align-self: flex-start; /* 왼쪽 정렬 */
`;

const InputTable = styled.div`
  display: flex;
  flex-direction: column; /* 아래로 나열 */
  margin-top: 20px;
`;

const InputField = styled.div`
  display: flex;
  align-items: center; /* 라벨과 입력창을 수직 중앙 정렬 */
  border: 1px solid #d9d9d9; /*  */
  border-bottom: none;

  &:last-child {
    border-bottom: 1px solid #d9d9d9; /* 마지막 요소는 테두리 추가 */
  }
`;

const Label = styled.label`
  width: 150px;
  height: 40px;
  font-size: 15px;
  padding: 10px;
  color: #313131;
  background-color: #f8f9ff;
  border-right: 1px solid #d9d9d9; /* 테두리 추가 */
  display: flex; /* Flexbox로 전환 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: left; /* 수평 왼쪽 정렬 */
`;

const Input = styled.input`
  width: 790px;
  height: 40px;
  padding: 10px;
  border: none;
  font-size: 15px;

  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: auto;
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #d9d9d9;
`;

const CloseButton = styled(Button)`
  background-color: #d9d9d9;
  color: #ffffff;

  &:hover {
    background-color: #b0b0b0;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #1e388b;
  color: #ffffff;

  &:hover {
    background-color: #3f5ba9;
  }
`;

const handleSubmit = () => {
  alert("등록성공");
};

const RegisterStaff = ({ onClose }) => {
  return (
    <RegisterContainer>
      <Title>직원 계정 등록</Title>
      <InputTable>
        <InputField>
          <Label>이름</Label>
          <Input type="text" placeholder="이름을 입력하세요" required />
        </InputField>

        <InputField>
          <Label>아이디</Label>
          <Input type="text" placeholder="아이디를 입력하세요" required />
        </InputField>

        <InputField>
          <Label>비밀번호</Label>
          <Input type="password" placeholder="비밀번호를 입력하세요" required />
        </InputField>

        <InputField>
          <Label>휴대폰 번호</Label>
          <Input type="tel" placeholder="휴대폰 번호를 입력하세요" required />
        </InputField>

        <InputField>
          <Label>이메일</Label>
          <Input type="email" placeholder="이메일을 입력하세요" required />
        </InputField>
      </InputTable>

      <ButtonContainer>
        <CloseButton type="button" onClick={onClose}>
          닫기
        </CloseButton>
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </ButtonContainer>
    </RegisterContainer>
  );
};

export default RegisterStaff;
