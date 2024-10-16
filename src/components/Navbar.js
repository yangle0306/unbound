import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as ChatIcon } from "../assets/chat.svg";
import { ReactComponent as MyPageIcon } from "../assets/mypage.svg";

import { ReactComponent as SearchIcon } from "../assets/search.svg"; // 검색용 SVG 아이콘 가져오기
import { ReactComponent as CityIcon } from "../assets/city.svg"; // 도시 검색용 SVG 아이콘 가져오기

// 스타일드 컴포넌트 정의
const NavbarContainer = styled.nav`
  width: 100%; /* 화면 전체 너비 */
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  position: relative;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px; /* 좌우 여백 */
  height: 86px;
  max-width: 1200px; /* 내부 컨테이너의 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  width: 100%; /* 너비를 100%로 설정해 컨테이너 크기에 맞게 확장 */
  gap: 60px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* 로고와 검색창 사이의 간격 설정 */
`;

const Logo = styled.img`
  width: 220px;
  height: 71px;
  background-color: white;
  border: 1px solid black;
  border-radius: 12px;
  object-fit: cover;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 541px;
  height: 46px;
  border: 3px solid #1e388b;
  border-radius: 8px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 60%; /* 6대4 비율로 검색 필드의 너비 조정 */
  height: 100%;
  padding-left: 40px; /* 아이콘을 위한 왼쪽 패딩 */
  border: none;
  font-size: 14px;
  outline: none;

  ::placeholder {
    color: #999;
  }
`;

const CityInput = styled.input`
  width: 40%; /* 6대4 비율로 도시 입력 필드의 너비 조정 */
  height: 100%;
  padding-left: 40px; /* 도시 아이콘을 위한 왼쪽 패딩 */
  border: none;
  font-size: 14px;
  outline: none;

  ::placeholder {
    color: #999;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 70%; /* 입력 필드 내부에서 구분선이 삽입되도록 설정 */
  background-color: #ccc; /* 회색 선 */
  position: absolute;
  left: 60%; /* 구분선을 검색 필드 끝에 위치 */
`;

const IconWrapper = styled.div`
  position: absolute;
  left: ${(props) => props.$left || "10px"};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const SearchButton = styled.button`
  width: 80px; /* 버튼 너비 */
  height: 46px; /* 검색창과 같은 높이 */
  background-color: #1e388b; /* 버튼 배경색 */
  color: white; /* 텍스트 색상 */
  border: 2px solid #1e388b; /* 테두리 */
  border-left: none; /* 왼쪽 테두리 제거 (검색창과 자연스럽게 연결) */
  border-radius: 8px; /* 오른쪽 모서리 둥글게 */
  cursor: pointer; /* 커서 모양 */
  font-size: 16px; /* 텍스트 크기 */
  font-weight: bold; /* 텍스트 굵기 */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3f5ba9; /* 호버 시 색상 변경 */
  }
`;

const NavButtons = styled.div`
  display: flex;
  margin-left: auto; /* 검색창과 버튼들 사이에 자동 여백 생성 */
`;

// 구조 분해 할당으로 active를 DOM에 전달되지 않도록 제거
const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
  border-bottom: ${(props) => (props.$active ? "4px solid #1E388B" : "none")};
  transition: border-bottom 0.3s ease;

  svg {
    height: 45px;
    width: auto;
    fill: ${(props) => (props.$active ? "#1E388B" : "#555")};
    stroke: ${(props) => (props.$active ? "#1E388B" : "none")};
    stroke-width: 1px;
  }

  &:hover svg {
    fill: #777;
    stroke: #1e388b;
  }
`;

// Navbar 컴포넌트
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 정보를 가져오기 위한 훅
  const [activeButton, setActiveButton] = useState(location.pathname); // 기본 선택된 버튼 설정

  return (
    <NavbarContainer>
      <InnerContainer>
        {/* 왼쪽 로고 및 검색창 */}
        <LeftSection>
          <Logo src="https://via.placeholder.com/220x71" alt="Logo" />

          {/* 검색창 */}
          <SearchContainer>
            {/* 검색 필드 */}
            <IconWrapper $left="10px">
              <SearchIcon /> {/* 검색 아이콘 */}
            </IconWrapper>
            <SearchInput placeholder="기업명, 포지션을 검색해보세요." />

            {/* 회색 구분선 */}
            <Divider />

            {/* 도시 필드 */}
            <IconWrapper $left="calc(60% + 10px)">
              {/* 도시 아이콘의 위치 설정 */}
              <CityIcon /> {/* 도시 아이콘 */}
            </IconWrapper>
            <CityInput placeholder="도시" />
          </SearchContainer>
          <SearchButton>검색</SearchButton>
        </LeftSection>

        {/* 오른쪽 네비게이션 버튼들 */}
        <NavButtons>
          <IconButton
            $active={activeButton === "/"}
            onClick={() => {
              setActiveButton("/");
              navigate("/");
            }}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            $active={activeButton === "/chat"}
            onClick={() => {
              setActiveButton("/chat");
              navigate("/chat");
            }}
          >
            <ChatIcon />
          </IconButton>
          <IconButton
            $active={activeButton === "/mypage"}
            onClick={() => {
              setActiveButton("/mypage");
              navigate("/mypage");
            }}
          >
            <MyPageIcon />
          </IconButton>
        </NavButtons>
      </InnerContainer>
    </NavbarContainer>
  );
}

export default Navbar;
