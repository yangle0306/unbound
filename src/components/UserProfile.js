import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Logout from "./Logout";
import ProfileSection from "./ProfileSection";
import ContentSection from "./ContentSection";
import CompanySection from "./CompanySection";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  gap: 8px;
  margin-top: 40px;
  width: 100%;
`;

const UserProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleResumeUpload = () => {
    navigate("/resume-upload");
  };

  const handleLogout = () => {
    setModalOpen(true);
  };

  return (
    <>
      <MainContainer>
        <ProfileSection
          onLogout={handleLogout}
          onResumeUpload={handleResumeUpload}
        />
        <ContentSection />
        <CompanySection />
      </MainContainer>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <Logout onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  );
};

export default UserProfile;
