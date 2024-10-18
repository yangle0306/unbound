import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomeSVG from "../../assets/home.svg";
import ChatSVG from "../../assets/chat.svg";
import MyPageSVG from "../../assets/mypage.svg";
import SearchSVG from "../../assets/search.svg";
import CitySVG from "../../assets/city.svg";

// 네비게이션 바 전체 컨테이너
const NavbarWrapper = styled.nav`
  width: 100%;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NavbarContent = styled.div`
  width: 1260px;
  height: 86px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoAndSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.img`
  width: 220px;
  height: 71px;
  border: 1px solid #808080;
  border-radius: 12px;
  object-fit: cover;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  width: 60%;
  height: 100%;
  padding-left: 40px;
  border: none;
  font-size: 14px;
  outline: none;

  ::placeholder {
    color: #999;
  }
`;

const CityInput = styled.input`
  width: 40%;
  height: 100%;
  padding-left: 40px;
  border: none;
  font-size: 14px;
  outline: none;

  ::placeholder {
    color: #999;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 70%;
  background-color: #ccc;
  position: absolute;
  left: 60%;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: ${(props) => props.$left || "10px"};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchButton = styled.button`
  width: 80px;
  height: 46px;
  background-color: #1e388b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3f5ba9;
  }
`;

const IconButtons = styled.div`
  width: 246px;
  display: flex;
  justify-content: space-between;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: ${(props) => (props.$active ? "4px solid #1E388B" : "none")};
  transition: border-bottom 0.3s ease;
  cursor: pointer;

  img {
    height: 45px;
    width: auto;
  }

  &:hover img {
    opacity: 0.7;
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  return (
    <NavbarWrapper>
      <NavbarContent>
        {/* 로고와 검색창 */}
        <LogoAndSearch>
          <Logo src="https://via.placeholder.com/220x71" alt="Logo" />
          <SearchSection>
            <SearchContainer>
              <IconWrapper>
                <img src={SearchSVG} alt="Search Icon" />
              </IconWrapper>
              <SearchInput placeholder="기업명, 포지션을 검색해보세요." />
              <Divider />
              <IconWrapper $left="calc(60% + 10px)">
                <img src={CitySVG} alt="City Icon" />
              </IconWrapper>
              <CityInput placeholder="도시" />
            </SearchContainer>
            <SearchButton>검색</SearchButton>
          </SearchSection>
        </LogoAndSearch>

        {/* 네비게이션 아이콘들 */}
        <IconButtons>
          <IconButton
            $active={activeButton === "/"}
            onClick={() => {
              setActiveButton("/");
              navigate("/");
            }}
          >
            <img src={HomeSVG} alt="Home Icon" />
          </IconButton>
          <IconButton
            $active={activeButton === "/chat"}
            onClick={() => {
              setActiveButton("/chat");
              navigate("/chat");
            }}
          >
            <img src={ChatSVG} alt="Chat Icon" />
          </IconButton>
          <IconButton
            $active={activeButton === "/mypage"}
            onClick={() => {
              setActiveButton("/mypage");
              navigate("/mypage");
            }}
          >
            <img src={MyPageSVG} alt="My Page Icon" />
          </IconButton>
        </IconButtons>
      </NavbarContent>
    </NavbarWrapper>
  );
}

export default Navbar;
