import React from "react";
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
  font-size: 1.5rem;
  color: black;
  text-decoration: none;
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
  text-decoration: none; /* 링크 기본 스타일 제거 */

  svg {
    height: 45px;
    width: auto;
    fill: #555;
  }

  &:hover svg {
    fill: #777;
  }
`;

// Navbar 컴포넌트
function Navbar() {
  return (
    <NavbarContainer>
      {/* 로고 */}
      <Logo to="/">MyLogo</Logo>

      {/* 검색창 */}
      <SearchContainer>
        <SearchInput type="text" placeholder="Search..." />
        <SearchButton>Search</SearchButton>
      </SearchContainer>

      {/* 네비게이션 버튼들 */}
      <NavButtons>
        <IconButton to="/">
          <HomeIcon />
        </IconButton>
        <IconButton to="/chat">
          <ChatIcon />
        </IconButton>
        <IconButton to="/mypage">
          <MyPageIcon />
        </IconButton>
      </NavButtons>
    </NavbarContainer>
  );
}

export default Navbar;
