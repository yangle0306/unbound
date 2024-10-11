import React, { useState } from "react";
import styled from "styled-components";
import FileUploadSVG from "../assets/fileupload.svg";
import UrlUploadSVG from "../assets/urlupload.svg";
import ResumeUploadSVG from "../assets/resumeupload.svg";
import Modal from "./Modal";
import FileUrlRegister from "./FileUrlRegister";
import ResumeNotRegistered from "./ResumeNotRegistered";

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
  margin-top: 10px;
`;

const LogoutText = styled.span`
  font-size: 12px;
  color: #838383;
  cursor: pointer;
  margin-bottom: auto;

  &:hover {
    text-decoration: underline;
  }
`;

const ResumeSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
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

// 체크표시 스타일 정의 (CSS로 만들기 ::before 사용)
const CheckMarkContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const CheckCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #16994c; /* 초록색 테두리 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 5px;

  /* 체크표시를 ::before로 만들기 */
  &::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 5px;
    width: 6px;
    height: 10px;
    border: solid #16994c; /* 초록색 체크 표시 */
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const ConfirmationText = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #00a04d;
`;

const ProfileSection = ({ user, onLogout, onResumeUpload }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isResumeNotRegistered, setResumeNotRegistered] = useState(false);

  const handleClick = () => {
    // if (!user.resumeExists) {
    //   setResumeNotRegistered(true); // 이력서가 없으면 ResumeNotRegistered 모달 띄우기
    // } else {
    //   setResumeNotRegistered(false);
    // }
    // setModalOpen(true);
  };

  return (
    <>
      <ProfileContainer>
        <Header>
          <ProfileInfo>
            <ProfileImage src={user.photoURL} alt="Profile" />
            <ProfileText>
              <UserName>{user.displayName}</UserName>
              {/* {!user.resumeExists && (
                <Description>이력서 작성하고 공고에 지원하세요.</Description>
              )} */}
            </ProfileText>
          </ProfileInfo>
          <LogoutText onClick={onLogout}>로그아웃</LogoutText>
        </Header>
        <ResumeSection>
          <SectionTitle>나의 이력서</SectionTitle>
          {/* {user.resumeExists && (
            <CheckMarkContainer>
              <CheckCircle />
              <ConfirmationText>이력서가 등록되었습니다.</ConfirmationText>
            </CheckMarkContainer>
          )} */}
        </ResumeSection>
        <Divider />
        <ButtonGroup>
          <IconButton
            style={{ backgroundImage: `url(${FileUploadSVG})` }}
            onClick={handleClick}
          />
          <IconButton
            style={{ backgroundImage: `url(${UrlUploadSVG})` }}
            onClick={handleClick}
          />
          <IconButton
            style={{ backgroundImage: `url(${ResumeUploadSVG})` }}
            onClick={onResumeUpload}
          />
        </ButtonGroup>
      </ProfileContainer>
      <Modal isOpen={isModalOpen}>
        {isResumeNotRegistered ? (
          <ResumeNotRegistered onClose={() => setModalOpen(false)} />
        ) : (
          <FileUrlRegister onClose={() => setModalOpen(false)} />
        )}
      </Modal>
    </>
  );
};

export default ProfileSection;
