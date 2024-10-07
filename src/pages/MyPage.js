import React, { useState } from "react";
import styled from "styled-components";
import ProfileSVG from "../assets/profile.svg";
import FileUploadSVG from "../assets/fileupload.svg";
import UrlUploadSVG from "../assets/urlupload.svg";
import ResumeUploadSVG from "../assets/resumeupload.svg";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Logout from "../components/Logout";
import Withdrawal from "../components/Withdrawal";

const MyPageContainer = styled.div`
  width: 677px;
  height: auto;
  margin: 20px auto;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 292px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 188px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const CompanyContainer = styled.div`
  width: 100%;
  height: 368px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const LogoutText = styled.span`
  font-size: 15px;
  margin-right: 20px;
  color: #838383;
  cursor: pointer;
`;

const WithdrawText = styled.span`
  font-size: 15px;
  color: #838383;
  cursor: pointer;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  margin-right: 20px;
`;

const LoginInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginInfoText = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 5px;
`;

const LoginDetailText = styled.span`
  font-size: 15px;
  color: #313131;
`;

const ResumeSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
`;

const ResumeTitle = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
`;

const ResumeDescription = styled.span`
  font-size: 12px;
  color: #313131;
`;

const Separator = styled.hr`
  margin: 20px 0;
  border: 0.5px solid #ccc;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
`;

const Button = styled.button`
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

function MyPage() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleWithdraw = () => {
    setWithdrawModalOpen(true);
  };

  const handleResumeUploadClick = () => {
    navigate("/resume-upload"); // /resume-upload로 이동
  };

  const handleFileUploadClick = () => {
    navigate("/file-upload"); // 파일 업로드 페이지로 이동
  };

  const handleUrlUploadClick = () => {
    navigate("/url-upload"); // URL 업로드 페이지로 이동
  };

  return (
    <>
      <MyPageContainer>
        <InfoContainer>
          {/* 상단 로그아웃, 회원탈퇴 */}
          <TopBar>
            <LogoutText onClick={handleLogout}>로그아웃</LogoutText>
            <WithdrawText onClick={handleWithdraw}>회원탈퇴</WithdrawText>
          </TopBar>

          {/* 프로필 섹션 */}
          <ProfileSection>
            <ProfileImage src={ProfileSVG} alt="프로필 사진" />
            <LoginInfo>
              <LoginInfoText>로그인 정보</LoginInfoText>
              <LoginDetailText>아이디 또는 이메일</LoginDetailText>
            </LoginInfo>
          </ProfileSection>

          {/* "나의 이력서"와 설명을 같은 줄에 배치 */}
          <ResumeSection>
            <ResumeTitle>나의 이력서</ResumeTitle>
            <ResumeDescription>
              이력서 작성하고 공고에 지원하세요.
            </ResumeDescription>
          </ResumeSection>

          {/* 구분선 */}
          <Separator />

          {/* 버튼 3개 */}
          <ButtonGroup>
            <Button
              style={{ backgroundImage: `url(${FileUploadSVG})` }}
              onClick={handleFileUploadClick} // 파일 업로드 페이지로 이동
            />
            <Button
              style={{ backgroundImage: `url(${UrlUploadSVG})` }}
              onClick={handleUrlUploadClick} // URL 업로드 페이지로 이동
            />
            <Button
              style={{ backgroundImage: `url(${ResumeUploadSVG})` }}
              onClick={handleResumeUploadClick} // 버튼 클릭 시 이동
            />
          </ButtonGroup>
        </InfoContainer>
        <ContentContainer />
        <CompanyContainer />
      </MyPageContainer>

      {/* 로그아웃 모달 */}
      <Modal isOpen={isLogoutModalOpen}>
        <Logout onClose={() => setLogoutModalOpen(false)} />
      </Modal>

      {/* 회원탈퇴 모달 */}
      <Modal isOpen={isWithdrawModalOpen}>
        <Withdrawal onClose={() => setWithdrawModalOpen(false)} />
      </Modal>
    </>
  );
}

export default MyPage;
