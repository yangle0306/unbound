import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  background-color: transparent;
  color: #ffffff;
  border: none;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #e9e9e9;
  }
`;

const AdminNavbar = () => {
  const [admin, setAdmin] = useState(null); // 관리자 정보 상태

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/admin/users`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
              },
            }
          );

          const data = await response.json();

          if (data.success) {
            // 관리자 정보를 상태로 저장
            setAdmin(data.userList[0]);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
    localStorage.removeItem("token");
    setAdmin(null);
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
        {admin ? (
          <>
            <UserInfo>
              접속자 : {admin.name}{" "}
              {admin.level === 1 ? "일반관리자" : "관리자직원"} |
            </UserInfo>
            <LoginLink as="button" onClick={handleLogout}>
              로그아웃
            </LoginLink>
          </>
        ) : (
          <LoginLink to="/admin/login">로그인</LoginLink>
        )}
      </div>
    </Container>
  );
};

export default AdminNavbar;
