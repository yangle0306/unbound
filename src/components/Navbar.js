import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as ChatIcon } from "../assets/chat.svg";
import { ReactComponent as MyPageIcon } from "../assets/mypage.svg";

// 스타일드 컴포넌트 정의
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 250px;
  height: 86px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* 로고와 검색창 사이의 간격 설정 */
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 71px;
  background-color: white;
  border: 1px solid black;
  border-radius: 12px;
  text-decoration: none;
  overflow: hidden;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  font-size: 1rem;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #777;
  }
`;

const NavButtons = styled.div`
  display: flex;
  margin-left: auto; /* 검색창과 버튼들 사이에 자동 여백 생성 */
`;

// 구조 분해 할당으로 active를 DOM에 전달되지 않도록 제거
const IconButton = styled(({ active, ...rest }) => <Link {...rest} />)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 60px; /* 버튼들 간 간격 설정 */
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
  border-bottom: ${({ active }) => (active ? "4px solid #1E388B" : "none")};
  transition: border-bottom 0.3s ease;

  svg {
    height: 45px;
    width: auto;
    fill: ${({ active }) => (active ? "#1E388B" : "#555")};
    stroke: ${({ active }) => (active ? "#1E388B" : "none")};
    stroke-width: 1px;
  }

  &:hover svg {
    fill: #777;
    stroke: #1e388b;
  }
`;

// Navbar 컴포넌트
function Navbar() {
  const [activeButton, setActiveButton] = useState("/"); // 기본 선택된 버튼 설정

  return (
    <NavbarContainer>
      {/* 왼쪽 로고 및 검색창 */}
      <LeftSection>
        <Logo to="/">
          <LogoImage src="https://via.placeholder.com/220x71" alt="Logo" />
        </Logo>

        {/* 검색창 */}
        <SearchContainer>
          <SearchInput type="text" placeholder="Search..." />
          <SearchButton>Search</SearchButton>
        </SearchContainer>
      </LeftSection>

      {/* 오른쪽 네비게이션 버튼들 */}
      <NavButtons>
        <IconButton
          to="/"
          active={activeButton === "/"}
          onClick={() => setActiveButton("/")}
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          to="/chat"
          active={activeButton === "/chat"}
          onClick={() => setActiveButton("/chat")}
        >
          <ChatIcon />
        </IconButton>
        <IconButton
          to="/mypage"
          active={activeButton === "/mypage"}
          onClick={() => setActiveButton("/mypage")}
        >
          <MyPageIcon />
        </IconButton>
      </NavButtons>
    </NavbarContainer>
  );
}

export default Navbar;
