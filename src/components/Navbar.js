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
  padding: 0 20px;
  height: 86px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px; /* 로고 너비 */
  height: 71px; /* 로고 높이 */
  background-color: white;
  border: 1px solid black; /* 테두리 1px solid 검은색 */
  border-radius: 12px; /* 둥근 사각형을 위한 반지름 */
  text-decoration: none; /* 링크의 기본 밑줄 제거 */
  overflow: hidden; /* 둥근 테두리가 잘리지 않도록 설정 */
`;

const LogoImage = styled.img`
  width: 100%; /* 로고의 너비를 부모 요소에 맞춤 */
  height: 100%; /* 로고의 높이를 부모 요소에 맞춤 */
  object-fit: cover; /* 이미지가 영역에 맞게 조정되도록 설정 */
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
`;

const IconButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
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
      {/* 로고 */}
      <Logo to="/">
        <LogoImage src="https://via.placeholder.com/220x71" alt="Logo" />
      </Logo>

      {/* 검색창 */}
      <SearchContainer>
        <SearchInput type="text" placeholder="Search..." />
        <SearchButton>Search</SearchButton>
      </SearchContainer>

      {/* 네비게이션 버튼들 */}
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
