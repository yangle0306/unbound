// src/components/UserProfile.js
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext"; // AuthContext 가져오기

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d62839;
  }
`;

const UserProfile = () => {
  const { logout } = useContext(AuthContext); // logout 함수 가져오기

  const handleLogout = () => {
    logout(); // 로그아웃 처리
  };

  return (
    <ProfileContainer>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </ProfileContainer>
  );
};

export default UserProfile;
