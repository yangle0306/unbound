import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import JobOpenings from "./JobOpenings";
import CompanyInfo from "./CompanyInfo";

// 최상위 컨테이너 스타일 (마진을 이용한 수평 중앙 정렬)
const DetailContainer = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: 40px auto 0 auto;
  text-align: center;
`;

// 둥근 직사각형 컨테이너 (680x403 크기, 마진 중앙 정렬)
const RoundedRectangle = styled.div`
  width: 680px;
  height: 403px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: space-between; /* 두 섹션을 수직으로 나눔 */
  padding: 20px;
  gap: 15px;
`;

// 상단 섹션 (왼쪽 정보)
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 요소들을 수직으로 균등 배치 */
  align-items: flex-start;
  text-align: left;
`;

const TopSection = styled.div`
  width: 100%;
  text-align: left;
`;

// 회사명 스타일
const CompanyName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #313131; /* 텍스트 색상 */
`;

// 직무 스타일
const JobTitle = styled.p`
  font-size: 15px;
  color: #313131; /* 텍스트 색상 */
  margin-top: 10px;
`;

const BottomSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end; /* 요소를 하단에 배치 */
  align-items: center;
  background-color: #fbfbfb;
  font-size: 15px;
  color: #313131;
  padding: 10px;
  line-height: 1.4; /* 줄 간격 설정 */
  text-align: center;
  border-radius: 15px;
  width: 410px;
  height: 240px;
  display: flex; /* Flexbox를 사용 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  margin: 0 auto;
`;

// RightSection 수정
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center; /* 텍스트 가운데 정렬 */
`;

// 회사 로고 스타일
const CompanyLogo = styled.img`
  width: 82px;
  height: 82px;
  object-fit: cover;
  border-radius: 10%;
  margin: 0 auto; /* 추가적으로 너비 중앙 배치 */
`;

// 기업 정보 스타일 컨테이너 추가
const CompanyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1; /* 공간을 모두 차지하도록 설정 */
  margin-top: 5px;
`;

// 회사 정보 텍스트 스타일
const CompanyDetailText = styled.p`
  font-size: 15px; /* 텍스트 크기 설정 */
  color: #313131; /* 텍스트 색상 설정 */
  margin: 5px 0; /* 각 텍스트 요소의 위아래 마진 설정 */
  line-height: 1.4; /* 줄 간격 설정 */
`;

// 버튼 컨테이너 - 한 줄에 두 개의 버튼을 배치하기 위해 Flexbox 사용
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

// 기본 버튼 스타일
const InfoButton = styled.button`
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px; /* 텍스트 크기 12px */
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  text-align: center;
  padding: 0; /* 패딩 제거 */
`;

// 기업정보 버튼(77x21 크기)
const SmallButton = styled(InfoButton)`
  color: ${(props) => (props.$active ? "#ffffff" : "#313131")};
  background-color: ${(props) => (props.$active ? "#1e388b" : "#d9d9d9")};
  width: 77px;
  height: 21px;

  &:hover {
    background-color: ${(props) => (props.$active ? "#2851a3" : "#b3b3b3")};
  }
`;

// 진행중인 채용보기 버튼(109x21 크기)
const LargeButton = styled(InfoButton)`
  color: ${(props) => (props.$active ? "#ffffff" : "#313131")};
  background-color: ${(props) => (props.$active ? "#1e388b" : "#d9d9d9")};
  width: 109px;
  height: 21px;

  &:hover {
    background-color: ${(props) => (props.$active ? "#2851a3" : "#b3b3b3")};
  }
`;

const VerticalDivider = styled.div`
  width: 1px; /* 세로 구분선 */
  height: 100%;
  background-color: #e0e0e0;
  margin: 0;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  margin: 0;
`;

const CompanyDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info"); // 'info' 또는 'openings'

  // 예시 데이터 - 실제로는 API 호출로 데이터를 가져올 수 있음
  const companyData = {
    1: {
      name: "Company A",
      jobTitle: "Software Engineer",
      location: "Seoul, South Korea",
      employeeCount: "500명",
      description:
        "회사 A는 테크 스타트업으로, 혁신적인 기술을 기반으로 다양한 프로젝트를 진행하고 있습니다.",
      images: [
        "https://via.placeholder.com/200", // 첫 번째 이미지
        "https://via.placeholder.com/200", // 두 번째 이미지
        "https://via.placeholder.com/200", // 세 번째 이미지
      ],
    },
    2: {
      name: "Company B",
      jobTitle: "Financial Analyst",
      location: "Busan, South Korea",
      employeeCount: "200명",
      description:
        "회사 B는 금융 서비스를 제공하며, 고객 맞춤형 솔루션을 제공합니다.",
      images: [
        "https://via.placeholder.com/200", // 첫 번째 이미지
        "https://via.placeholder.com/200", // 두 번째 이미지
        "https://via.placeholder.com/200", // 세 번째 이미지
      ],
    },
  };

  const company = companyData[id];
  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <DetailContainer>
      <RoundedRectangle>
        <LeftSection>
          <TopSection>
            <CompanyName>회사명: {company.name}</CompanyName>
            <JobTitle>{company.jobTitle}</JobTitle>
          </TopSection>
          <Divider />
          <BottomSection>{company.description}</BottomSection>
        </LeftSection>

        <VerticalDivider />

        <RightSection>
          {/* 회사 로고 */}
          <CompanyLogo src="https://via.placeholder.com/82" alt="회사 로고" />

          {/* 기업 정보 컨테이너 */}
          <CompanyInfoContainer>
            <CompanyInfo>기업정보</CompanyInfo>
            <CompanyDetailText>{company.location}</CompanyDetailText>
            <CompanyDetailText>{company.employeeCount}</CompanyDetailText>
          </CompanyInfoContainer>

          {/* 버튼 컨테이너 */}
          <ButtonContainer>
            <SmallButton
              $active={activeTab === "info"}
              onClick={() => setActiveTab("info")}
            >
              기업정보
            </SmallButton>
            <LargeButton
              $active={activeTab === "openings"}
              onClick={() => setActiveTab("openings")}
            >
              진행중인 채용보기
            </LargeButton>
          </ButtonContainer>
        </RightSection>
      </RoundedRectangle>

      {/* 동적으로 회사 정보를 보여주는 섹션 */}
      {activeTab === "info" && <CompanyInfo company={company} />}
      {activeTab === "openings" && <JobOpenings />}
    </DetailContainer>
  );
};

export default CompanyDetail;
