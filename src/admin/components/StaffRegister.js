import React, { useState } from "react";
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

const ModifyButton = styled(Button)`
  background-color: #4caf50;
  color: #ffffff;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: #ffffff;

  &:hover {
    background-color: #d32f2f;
  }
`;

const StaffRegister = ({ staff, onClose }) => {
  const [isEditMode, setEditMode] = useState(false); // 수정 모드 관리
  const [formData, setFormData] = useState({
    name: staff ? staff.name : "",
    id: staff ? staff.id : "",
    password: "", // password 필드를 추가
    phone: staff ? staff.phone : "",
    email: staff ? staff.email : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // 유효성 검사
    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/employees`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
          body: JSON.stringify({
            id: formData.id,
            password: formData.password,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          }),
        }
      );

      if (response.ok) {
        alert("등록 성공");
        onClose(); // 모달 닫기
        window.location.reload(); // 페이지 리로드
      } else {
        alert("등록 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  // PUT 요청 (직원 정보 수정)
  const handleModify = async () => {
    // 유효성 검사
    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/employees`,
        {
          method: "PUT", // 수정 시 PUT 요청
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
          body: JSON.stringify({
            id: formData.id,
            password: formData.password,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          }),
        }
      );

      if (response.ok) {
        alert("수정 성공");
        onClose(); // 모달 닫기
        window.location.reload(); // 페이지 리로드
      } else {
        alert("수정 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  // DELETE 요청 (직원 삭제)
  const handleDelete = async () => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/employees`,
        {
          method: "DELETE", // 삭제 시 DELETE 요청
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
          body: JSON.stringify({
            id: formData.id,
          }),
        }
      );

      if (response.ok) {
        alert("삭제 성공");
        onClose(); // 모달 닫기
        window.location.reload(); // 페이지 리로드
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <RegisterContainer>
      <Title>{staff ? "직원 정보" : "직원 계정 등록"}</Title>
      <InputTable>
        <InputField>
          <Label>이름</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            disabled={!!staff && !isEditMode} // 수정 모드가 아니면 비활성화
          />
        </InputField>

        <InputField>
          <Label>아이디</Label>
          <Input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            disabled={!!staff && !isEditMode} // 수정 모드가 아니면 비활성화
          />
        </InputField>

        <InputField>
          <Label>비밀번호</Label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={handleChange}
            disabled={!!staff && !isEditMode} // 수정 모드가 아니면 비활성화
          />
        </InputField>

        <InputField>
          <Label>휴대폰 번호</Label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="휴대폰 번호를 입력하세요"
            disabled={!!staff && !isEditMode} // 수정 모드가 아니면 비활성화
          />
        </InputField>

        <InputField>
          <Label>이메일</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
            disabled={!!staff && !isEditMode} // 수정 모드가 아니면 비활성화
          />
        </InputField>
      </InputTable>

      <ButtonContainer>
        <CloseButton type="button" onClick={onClose}>
          닫기
        </CloseButton>
        {staff ? (
          isEditMode ? (
            <SubmitButton onClick={handleModify}>수정 완료</SubmitButton>
          ) : (
            <>
              <ModifyButton onClick={() => setEditMode(true)}>
                수정
              </ModifyButton>
              <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            </>
          )
        ) : (
          <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
        )}
      </ButtonContainer>
    </RegisterContainer>
  );
};

export default StaffRegister;
