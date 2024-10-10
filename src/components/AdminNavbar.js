import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext"; // AuthContext 불러오기

const Container = styled.nav`
  width: 100%;
  height: 86px;
  background-color: #1e388b;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 220px;
  height: 71px;
  border-radius: 5px;
  object-fit: cover;
  border: 1px solid #000000; /* 테두리 */
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-left: 20px;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 24px;

  &:hover {
    color: #f0f0f0;
  }
`;

const UserInfo = styled.div`
  font-size: 16px;
  color: #ffffff;
  margin-right: 10px;
`;

const LoginLink = styled(Link)`
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;

  &:hover {
    color: #f0f0f0;
  }
`;

const AdminNavbar = () => {
  const { isAdminLoggedIn, admin, logout } = useContext(AuthContext); // 로그인 여부, 관리자 정보, 로그아웃 함수 가져오기

  const handleLogout = () => {
    logout(); // 로그아웃 처리
  };

  return (
    <Container>
      <Logo src="https://via.placeholder.com/220x71" alt="언바운드 로고" />
      <Menu>
        <MenuItem>
          <MenuLink to="/admin/members">회원관리</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/admin/entries">엔트리 관리</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/admin/messages">메세지</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/admin/companies">기업관리</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/admin/banners">배너관리</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/admin/staff">직원관리</MenuLink>
        </MenuItem>
      </Menu>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isAdminLoggedIn && admin && (
          <UserInfo>
            접속자 : {admin.name} {admin.role} |
          </UserInfo>
        )}
        {isAdminLoggedIn ? (
          <LoginLink onClick={handleLogout}>로그아웃</LoginLink>
        ) : (
          <LoginLink as={Link} to="/admin/login">
            로그인
          </LoginLink>
        )}
      </div>
    </Container>
  );
};

export default AdminNavbar;
