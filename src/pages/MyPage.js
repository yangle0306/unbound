import React, { useContext, useState } from "react";
import styled from "styled-components";
import ProfileSVG from "../assets/profile.svg";
import FileUploadSVG from "../assets/fileupload.svg";
import UrlUploadSVG from "../assets/urlupload.svg";
import ResumeUploadSVG from "../assets/resumeupload.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Logout from "../components/Logout";
import Withdrawal from "../components/Withdrawal";
import CompanySVG from "../assets/company.svg";
import MessageSVG from "../assets/message.svg";
import { AuthContext } from "../context/AuthContext";

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
  border: 1px solid #e0e0e0; /* 테두리 */
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

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  padding-top: 10px;
  text-align: center; /* 텍스트 중앙 정렬 */
`;

const ContentBox = styled.div`
  width: 100%;
  padding: 0 20px;
  height: 100px;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  height: 92px;
  display: flex;
  align-items: center;
  justify-content: space-evenly; /* 4개의 구분선을 균등하게 배치 */
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: #ccc;
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  justify-content: center;
`;

const ContentText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
  text-align: center;
`;

const ContentInfoText = styled.div`
  font-size: 14px;
  color: #313131;
  text-align: center;
  margin-top: 10px;
`;

const CompanyBox = styled.div`
  width: 100%;
  height: 75%;
  overflow-y: auto; /* 세로 스크롤 가능하게 */
  overflow-x: hidden; /* 가로 스크롤 막기 */
`;

const CompanyItem = styled.div`
  width: 663px;
  height: 52px;
  background-color: ${(props) =>
    props.$index % 2 === 0 ? "#F8F9FF" : "#FFFFFF"}; /* 배경색 반복 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 5px;
  border-radius: 8px;
  padding: 0 10px; /* 패딩을 추가해 양 끝 공간 확보 */
`;

const CompanyName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #313131;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

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

const NoCompanyText = styled.p`
  font-size: 14px;
  color: #838383;
  margin-top: 5px;
  margin-left: 10px;
`;

function MyPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const location = useLocation(); // 현재 경로 정보
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleWithdraw = () => {
    setWithdrawModalOpen(true);
  };

  const handleResumeUploadClick = () => {
    navigate("/resume-upload", { state: { from: location } }); // 이전 경로를 state로 전달
  };

  const handleFileUploadClick = () => {
    navigate("/file-upload", { state: { from: location } }); // 파일 업로드 페이지로 이동
  };

  const handleUrlUploadClick = () => {
    navigate("/url-upload", { state: { from: location } }); // URL 업로드 페이지로 이동
  };

  if (!user) return null;
  const resume = user?.resume; // 이력서가 있을 때만 데이터를 가져옴

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
            <ProfileImage src={user.picture || ProfileSVG} alt="프로필 사진" />
            <LoginInfo>
              <LoginInfoText>{user.name}</LoginInfoText>
              <LoginDetailText>{user.email}</LoginDetailText>
            </LoginInfo>
          </ProfileSection>

          {/* "나의 이력서"와 설명을 같은 줄에 배치 */}
          <ResumeSection>
            <ResumeTitle>나의 이력서</ResumeTitle>
            <ResumeDescription>
              {user.resumeExists ? (
                <CheckMarkContainer>
                  {/* 이력서가 있으면 체크표시와 설명 표시 */}
                  <CheckCircle />
                  <ConfirmationText>이력서가 등록되었습니다.</ConfirmationText>
                </CheckMarkContainer>
              ) : (
                <>
                  {/* 이력서가 없으면 기본 메시지 표시 */}
                  이력서 작성하고 공고에 지원하세요.
                </>
              )}
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
        <ContentContainer>
          <Title>내용</Title>
          {/* 구분선 */}
          <Separator />
          <ContentBox>
            <Content>
              <ContentItem>
                <ContentText>경력 기간</ContentText>
                <ContentInfoText>
                  {resume
                    ? resume.careers.map((career) => career.period).join(", ")
                    : "이력서를 등록하세요"}
                </ContentInfoText>
              </ContentItem>
              <VerticalLine />
              <ContentItem>
                <ContentText>희망포지션</ContentText>
                <ContentInfoText>
                  {resume ? resume.desiredPosition : "이력서를 등록하세요"}
                </ContentInfoText>
              </ContentItem>
              <VerticalLine />
              <ContentItem>
                <ContentText>희망연봉</ContentText>
                <ContentInfoText>
                  {resume ? resume.desiredSalary : "이력서를 등록하세요"}
                </ContentInfoText>
              </ContentItem>
              <VerticalLine />
              <ContentItem>
                <ContentText>희망근무지역</ContentText>
                <ContentInfoText>
                  {resume ? resume.desiredLocation : "이력서를 등록하세요"}
                </ContentInfoText>
              </ContentItem>
            </Content>
          </ContentBox>
        </ContentContainer>

        <CompanyContainer>
          <Title>지원기업</Title>
          {/* 구분선 */}
          <Separator />
          <CompanyBox>
            {/* 기업이 있는 경우 렌더링 */}
            {user.appliedCompanies && user.appliedCompanies.length > 0 ? (
              user.appliedCompanies.map((company, index) => (
                <CompanyItem key={index} $index={index}>
                  <CompanyName>{company.name}</CompanyName>
                  <IconGroup>
                    <Icon src={CompanySVG} alt="Company" />
                    <Icon src={MessageSVG} alt="Message" />
                  </IconGroup>
                </CompanyItem>
              ))
            ) : (
              // 기업이 없을 경우 텍스트 표시
              <NoCompanyText>아직 지원한 기업이 없습니다.</NoCompanyText>
            )}
          </CompanyBox>
        </CompanyContainer>
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
