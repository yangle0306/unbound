import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅 가져오기
import ProfileSVG from "../assets/profile.svg"; // 프로필 기본 이미지
import FileUploadSVG from "../assets/fileupload.svg"; // 버튼 이미지
import UrlUploadSVG from "../assets/urlupload.svg"; // 버튼 이미지
import ResumeUploadSVG from "../assets/resumeupload.svg"; // 버튼 이미지
import Modal from "./Modal";
import Logout from "./Logout";

// 메인 컨테이너 (ProfileContainer와 ContentContainer를 포함)
const MainContainer = styled.div`
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  margin: 0 auto; /* 너비 기준 중앙 정렬 */
  gap: 20px; /* ProfileContainer와 ContentContainer 사이 간격 */
  margin-top: 40px;
  width: 100%; /* 부모 요소의 전체 너비를 차지하게 설정 */
`;

// 둥근 직사각형 프로필 컨테이너
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

// 상단 정보 컨테이너 (로그아웃 텍스트 포함)
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

// 프로필 정보 컨테이너 (이미지 + 텍스트)
const ProfileInfo = styled.div`
  display: flex;
  align-items: center; /* 프로필 이미지와 텍스트를 같은 줄에 배치 */
`;

// 프로필 사진 (54x54 이미지)
const ProfileImage = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px; /* 이미지와 텍스트 사이 간격 */
`;

// 프로필 텍스트 래퍼
const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// 사용자 이름 (21px, 볼드체)
const UserName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin: 0; /* 간격 제거 */
`;

// 사용자 간단 설명 (12px, 레귤러)
const Description = styled.p`
  font-size: 12px;
  color: #313131;
  margin: 5px 0 0 0; /* 위쪽에 약간의 간격 */
`;

// 로그아웃 버튼 텍스트 (우측 상단 Flex로 배치)
const LogoutText = styled.span`
  font-size: 14px;
  color: #e63946;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// 구분선 위의 제목 텍스트
const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
  align-self: flex-start;
`;

// 회색 구분선
const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc; /* 회색 선 */
  margin: 10px 0; /* 선과 콘텐츠 사이 여백 */
`;

// 버튼을 한 줄에 3개 배치
const ButtonGroup = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

// 각각의 버튼 스타일 (111x37 사이즈, SVG 배경 이미지)
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

// 새로운 내용 컨테이너 (300x202, 둥근 직사각형)
const ContentContainer = styled.div`
  width: 300px;
  height: 202px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #313131;
`;

// "내용" 제목 스타일
const ContentTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 10px;
`;

// 2x2 배열 텍스트 컨테이너 (균등한 높이를 유지하기 위해 grid 사용)
const TextGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr; /* 두 줄로 균등한 높이 */
  gap: 10px;
  height: 100%; /* 그리드가 컨테이너 높이 차지 */
`;

// 각 셀에 들어가는 텍스트 (제목과 설명, 중앙 정렬)
const TextItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  font-size: 14px;
  color: #313131;
  text-align: center;
`;

// 각 셀의 제목
const ItemTitle = styled.h4`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
`;

// 각 셀의 설명
const ItemDescription = styled.p`
  font-size: 14px;
  color: #313131;
  margin-top: 5px;
`;

// 지원기업 컨테이너 (535x202, 둥근 직사각형)
const CompanyContainer = styled.div`
  width: 535px;
  height: 202px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #313131;
`;

// 지원기업 제목
const CompanyTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 5px;
`;

const NoCompanyText = styled.p`
  font-size: 14px;
  color: #838383;
  margin-top: 5px;
`;

const UserProfile = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  const [isModalOpen, setModalOpen] = useState(false);

  // 이력서 등록 페이지로 이동하는 함수
  const handleResumeUpload = () => {
    navigate("/resume-upload"); // 이력서 등록 페이지로 이동
  };

  return (
    <>
      <MainContainer>
        <ProfileContainer>
          {/* 상단: 프로필 정보와 로그아웃 텍스트 */}
          <Header>
            <ProfileInfo>
              <ProfileImage src={ProfileSVG} alt="Profile" />
              <ProfileText>
                <UserName>홍길동</UserName>
                <Description>
                  간단한 자기소개글을 여기에 적어주세요.
                </Description>
              </ProfileText>
            </ProfileInfo>
            <LogoutText onClick={() => setModalOpen(true)}>로그아웃</LogoutText>
          </Header>

          {/* 구분선 위의 "나의 이력서" 텍스트 */}
          <SectionTitle>나의 이력서</SectionTitle>

          {/* 구분선 */}
          <Divider />

          {/* 한 줄에 3개의 아이콘 버튼 (111x37 크기) */}
          <ButtonGroup>
            <IconButton style={{ backgroundImage: `url(${FileUploadSVG})` }} />
            <IconButton style={{ backgroundImage: `url(${UrlUploadSVG})` }} />
            {/* 이력서 등록 버튼 */}
            <IconButton
              style={{ backgroundImage: `url(${ResumeUploadSVG})` }}
              onClick={handleResumeUpload} /* 버튼 클릭 시 이동 */
            />
          </ButtonGroup>
        </ProfileContainer>

        {/* 새로운 내용 컨테이너 */}
        <ContentContainer>
          {/* "내용" 제목 */}
          <ContentTitle>내용</ContentTitle>

          {/* 구분선 */}
          <Divider />

          {/* 2x2 배열 텍스트 */}
          <TextGrid>
            <TextItem>
              <ItemTitle>첫 번째 제목</ItemTitle>
              <ItemDescription>첫 번째 설명</ItemDescription>
            </TextItem>
            <TextItem>
              <ItemTitle>두 번째 제목</ItemTitle>
              <ItemDescription>두 번째 설명</ItemDescription>
            </TextItem>
            <TextItem>
              <ItemTitle>세 번째 제목</ItemTitle>
              <ItemDescription>세 번째 설명</ItemDescription>
            </TextItem>
            <TextItem>
              <ItemTitle>네 번째 제목</ItemTitle>
              <ItemDescription>네 번째 설명</ItemDescription>
            </TextItem>
          </TextGrid>
        </ContentContainer>

        {/* 지원기업 컨테이너 */}
        <CompanyContainer>
          <CompanyTitle>지원 기업</CompanyTitle>

          {/* 구분선 */}
          <Divider />

          {/* "아직 지원한 기업이 없습니다." 문구 */}
          <NoCompanyText>아직 지원한 기업이 없습니다.</NoCompanyText>
        </CompanyContainer>
      </MainContainer>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <Logout onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  );
};

export default UserProfile;
