import React from "react";
import styled from "styled-components";
import ProfileSVG from "../assets/profile.svg";
import FileUploadSVG from "../assets/fileupload.svg";
import UrlUploadSVG from "../assets/urlupload.svg";
import ResumeUploadSVG from "../assets/resumeupload.svg";

// 프로필 관련 스타일 정의는 기존 코드 재사용
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 394px;
  height: 202px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin: 0;
`;

const Description = styled.p`
  font-size: 12px;
  color: #313131;
  margin: 5px 0 0 0;
`;

const LogoutText = styled.span`
  font-size: 14px;
  color: #e63946;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
  align-self: flex-start;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;

const ButtonGroup = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const IconButton = styled.button`
  width: 111px;
  height: 37px;
  background-color: transparent;
  border: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

const ProfileSection = ({ onLogout, onResumeUpload }) => {
  return (
    <ProfileContainer>
      <Header>
        <ProfileInfo>
          <ProfileImage src={ProfileSVG} alt="Profile" />
          <ProfileText>
            <UserName>홍길동</UserName>
            <Description>간단한 자기소개글을 여기에 적어주세요.</Description>
          </ProfileText>
        </ProfileInfo>
        <LogoutText onClick={onLogout}>로그아웃</LogoutText>
      </Header>
      <SectionTitle>나의 이력서</SectionTitle>
      <Divider />
      <ButtonGroup>
        <IconButton style={{ backgroundImage: `url(${FileUploadSVG})` }} />
        <IconButton style={{ backgroundImage: `url(${UrlUploadSVG})` }} />
        <IconButton
          style={{ backgroundImage: `url(${ResumeUploadSVG})` }}
          onClick={onResumeUpload}
        />
      </ButtonGroup>
    </ProfileContainer>
  );
};

export default ProfileSection;
