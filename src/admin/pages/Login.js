import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const LoginBox = styled.div`
  width: 500px;
  height: 337px;
  background-color: #ffffff;
  border-radius: 15px;
  border: 1px solid #d8d7d7; /* 테두리 */
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 173px;
  height: 56px;
  border-radius: 5px;
  object-fit: cover;
  border: 1px solid #000000; /* 테두리 */
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin-left: 10px;
`;

const LabelInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: #f5f5f5;
  border-radius: 30px;
  overflow: hidden; /* 둥근 모서리 바깥으로 내용이 넘치지 않도록 처리 */
`;

const Label = styled.label`
  width: 120px; /* 라벨 넓이 */
  height: 40px;
  font-size: 18px;
  color: #313131;
  background-color: #f8f9ff; /* 라벨 배경색 */
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  border: 1px solid #d9d9d9; /* 테두리 */
  border-right: none; /* 라벨과 입력 필드 사이 테두리 제거 */
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 16px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border: 1px solid #d9d9d9; /* 테두리 */
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1e388b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #3f5ba9;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #d9d9d9;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  background-color: ${(props) => (props.$checked ? "#d9d9d9" : "transparent")};

  &:after {
    content: "";
    position: absolute;
    left: 4px;
    top: 1px;
    width: 6px;
    height: 10px;
    border: solid ${(props) => (props.$checked ? "#a9a9a9" : "transparent")}; /* 체크표시 색상 */
    border-width: 0 2px 2px 0;
    transform: ${(props) => (props.$checked ? "rotate(45deg)" : "none")};
    opacity: ${(props) => (props.$checked ? "1" : "0")};
  }
`;

const CheckboxLabel = styled.label`
  margin-left: 5px;
  font-size: 16px;
  color: #313131;
`;

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // 아이디 저장 체크 상태 관리

  // 페이지 로드 시 로컬 스토리지에서 저장된 아이디를 불러오기
  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // 로그인 성공 처리
        alert("로그인 성공");
        if (rememberMe) {
          localStorage.setItem("savedUsername", username); // 아이디 저장
        } else {
          localStorage.removeItem("savedUsername"); // 아이디 저장 취소 시 삭제
        }
        // 토큰 저장 및 페이지 이동
        localStorage.setItem("token", data.token);
        navigate("/admin"); // 관리자 메인페이지로 이동
      } else {
        // 로그인 실패 처리
        alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe); // 체크박스 상태 토글
  };

  return (
    <Container>
      <LoginBox>
        <Header>
          {/* 로고 이미지 경로는 실제 파일 경로로 교체 */}
          <Logo src="https://via.placeholder.com/173x56" alt="언바운드 로고" />
          <Title>관리자 로그인</Title>
        </Header>
        <LabelInputWrapper>
          <Label htmlFor="username">아이디</Label>
          <Input
            type="text"
            id="username"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </LabelInputWrapper>
        <LabelInputWrapper>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputWrapper>

        {/* 아이디 저장 체크박스 */}

        <CheckboxWrapper onClick={handleRememberMeChange}>
          <StyledCheckbox $checked={rememberMe} />
          <CheckboxLabel htmlFor="rememberMe">아이디 저장</CheckboxLabel>
        </CheckboxWrapper>
        <Button onClick={handleLogin}>로그인</Button>
      </LoginBox>
    </Container>
  );
}

export default Login;
