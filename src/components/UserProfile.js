import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Logout from "./Logout";
import ProfileSection from "./ProfileSection";
import ContentSection from "./ContentSection";
import CompanySection from "./CompanySection";

const MainContainer = styled.div`
  width: 1260px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 40px;
`;

const UserProfile = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleResumeUpload = () => {
    navigate("/resume-upload");
  };

  const handleLogout = () => {
    setModalOpen(true);
  };

  if (!user) return null;

  return (
    <>
      <MainContainer>
        <ProfileSection
          user={user}
          onLogout={handleLogout}
          onResumeUpload={handleResumeUpload}
        />
        <ContentSection user={user} />
        <CompanySection companies={user.appliedCompanies} />
      </MainContainer>

      <Modal isOpen={isModalOpen}>
        <Logout onLogout={onLogout} onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  );
};

export default UserProfile;
