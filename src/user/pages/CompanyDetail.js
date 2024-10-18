import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import JobOpenings from "../components/JobOpenings";
import CompanyInfo from "../components/CompanyInfo";

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

const CompanyInfoText = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: #313131; /* 텍스트 색상 */
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

  const mockCompanies = {
    1: {
      name: "A 회사",
      logo: "https://via.placeholder.com/82",
      title: "소프트웨어 엔지니어",
      city: "서울",
      numEmployees: 150,
      introduction:
        "저희는 AI 및 머신러닝을 전문으로 하는 선도적인 소프트웨어 회사입니다.",
      description:
        "A 회사는 전 세계 기업을 위한 인공지능 솔루션을 개발하는 데 주력하고 있으며, 10년 이상의 경험을 바탕으로 한국 내 최고의 AI 회사 중 하나입니다.",
      recruiting: true,
      imageSrc: "https://via.placeholder.com/300x125",
      images: [
        "https://via.placeholder.com/200", // 첫 번째 이미지
        "https://via.placeholder.com/200", // 두 번째 이미지
        "https://via.placeholder.com/200", // 세 번째 이미지
      ],
      jobOpenings: [
        {
          id: 1,
          name: "A 회사",
          title: "주니어 소프트웨어 엔지니어",
          recruiting: true,
          logo: "https://via.placeholder.com/69",
          basicInfo: {
            companyName: "A 회사",
            location: "서울, 대한민국",
            employees: 150,
            position: "주니어 소프트웨어 엔지니어",
          },
          jobInfo: {
            jobDescription:
              "React를 사용하여 웹 애플리케이션을 개발하고 유지 관리합니다.",
            workEnvironment: "애자일, 원격 근무 가능, 협업 중심",
            appealPoints: "최첨단 AI 프로젝트에 참여할 수 있습니다.",
            employmentType: "정규직",
            workplace: "서울 본사",
            workHours: "주 40시간, 유연 근무제",
          },
          welfareInfo: {
            benefits: "건강보험, 직원 스톡 옵션, 무료 점심 제공",
            holidays: "유급 휴가 15일, 국경일 포함",
            smokingPolicy: "금연 사무실, 흡연 구역 제공",
            salary: "연봉 6천만 원 ~ 7천만 원",
            bonuses: "연간 성과 기반 보너스",
            hiringProcess: "이력서 검토, 기술 면접, 인사 면접",
          },
          experienceInfo: {
            experience: "소프트웨어 개발 경력 0-2년",
            japaneseLevel: "필요 없음",
            englishLevel: "영어 구사 가능",
            requiredSkills: "React, JavaScript, HTML/CSS",
            preferredSkills: "REST API 사용 경험, Git",
            idealCandidate:
              "AI에 열정이 있으며 새로운 기술을 배우고자 하는 사람",
          },
        },
        {
          id: 2,
          name: "A 회사",
          title: "시니어 소프트웨어 엔지니어",
          recruiting: true,
          logo: "https://via.placeholder.com/69",
          basicInfo: {
            companyName: "A 회사",
            location: "서울, 대한민국",
            employees: 150,
            position: "시니어 소프트웨어 엔지니어",
          },
          jobInfo: {
            jobDescription:
              "AI 및 머신러닝 프로젝트에서 개발 팀을 이끌어갑니다.",
            workEnvironment: "애자일, 팀 지향적, 협업 중심",
            appealPoints:
              "최고 수준의 엔지니어와 최첨단 기술을 다룰 수 있습니다.",
            employmentType: "정규직",
            workplace: "서울 본사",
            workHours: "주 40시간, 유연 근무제",
          },
          welfareInfo: {
            benefits: "건강보험, 직원 스톡 옵션, 무료 점심 제공",
            holidays: "유급 휴가 20일, 국경일 포함",
            smokingPolicy: "금연 사무실, 흡연 구역 제공",
            salary: "연봉 1억 원 ~ 1억 2천만 원",
            bonuses: "연간 성과 기반 보너스",
            hiringProcess: "이력서 검토, 기술 면접, 인사 면접",
          },
          experienceInfo: {
            experience: "소프트웨어 개발 경력 5년 이상",
            japaneseLevel: "필요 없음",
            englishLevel: "영어 구사 가능",
            requiredSkills: "React, Node.js, Python, REST API",
            preferredSkills: "AI/ML 프로젝트 경험, 클라우드 인프라",
            idealCandidate:
              "혁신적이며 소프트웨어 팀을 이끌어본 경험이 있는 사람",
          },
        },
      ],
    },
    2: {
      name: "B 회사",
      logo: "https://via.placeholder.com/82",
      title: "프론트엔드 개발자",
      city: "부산",
      numEmployees: 85,
      introduction: "최첨단 웹 애플리케이션을 개발하는 회사입니다.",
      description:
        "B 회사는 React 및 Angular와 같은 최신 프론트엔드 프레임워크를 사용하여 최첨단 웹 애플리케이션을 구축하는 데 중점을 둡니다.",
      recruiting: false,
      imageSrc: "https://via.placeholder.com/300x125",
      images: [
        "https://via.placeholder.com/200", // 첫 번째 이미지
        "https://via.placeholder.com/200", // 두 번째 이미지
        "https://via.placeholder.com/200", // 세 번째 이미지
      ],
      jobOpenings: [
        {
          id: 3,
          name: "B 회사",
          title: "프론트엔드 개발자",
          recruiting: false,
          logo: "https://via.placeholder.com/69",
          basicInfo: {
            companyName: "B 회사",
            location: "부산, 대한민국",
            employees: 85,
            position: "프론트엔드 개발자",
          },
          jobInfo: {
            jobDescription:
              "반응형 웹 애플리케이션을 개발하고 유지 관리합니다.",
            workEnvironment: "애자일, 협업적, 혁신적",
            appealPoints: "대규모 소비자 대상 프로젝트에 참여할 수 있습니다.",
            employmentType: "정규직",
            workplace: "부산 본사",
            workHours: "주 40시간, 유연 근무제",
          },
          welfareInfo: {
            benefits: "건강보험, 매월 팀 빌딩 행사",
            holidays: "유급 휴가 12일, 국경일 포함",
            smokingPolicy: "금연 사무실",
            salary: "연봉 5천만 원 ~ 6천만 원",
            bonuses: "프로젝트 완료 보너스",
            hiringProcess: "이력서 검토, 기술 면접, 인사 면접",
          },
          experienceInfo: {
            experience: "프론트엔드 개발 경력 2년 이상",
            japaneseLevel: "필요 없음",
            englishLevel: "기본적인 의사소통 가능",
            requiredSkills: "React, HTML/CSS, JavaScript",
            preferredSkills: "Angular, TypeScript 경험",
            idealCandidate:
              "창의적이고 세부 사항에 주의를 기울이는 프론트엔드 개발자",
          },
        },
      ],
    },
    3: {
      name: "C 회사",
      logo: "https://via.placeholder.com/82",
      title: "백엔드 개발자",
      city: "인천",
      numEmployees: 50,
      introduction:
        "클라우드 컴퓨팅 및 분산 시스템을 전문으로 하는 회사입니다.",
      description:
        "C 회사는 다양한 산업에 클라우드 솔루션과 서버 관리, 분산 아키텍처를 제공하는 데 전문성을 가지고 있습니다.",
      recruiting: true,
      imageSrc: "https://via.placeholder.com/300x125",
      images: [
        "https://via.placeholder.com/200", // 첫 번째 이미지
        "https://via.placeholder.com/200", // 두 번째 이미지
        "https://via.placeholder.com/200", // 세 번째 이미지
      ],
      jobOpenings: [],
    },
    4: {
      name: "D 회사",
      logo: "https://via.placeholder.com/82",
      title: "데이터 과학자",
      city: "대구",
      numEmployees: 120,
      introduction: "빅데이터를 분석하여 최첨단 인사이트를 제공합니다.",
      description:
        "D 회사는 빅데이터 분석을 통해 기업이 더 나은 의사결정을 할 수 있도록 돕습니다. 데이터 분석, 머신러닝, 예측 모델링 서비스를 제공합니다.",
      recruiting: true,
      imageSrc: "https://via.placeholder.com/300x125",
      images: [
        "https://via.placeholder.com/200", // 첫 번째 이미지
        "https://via.placeholder.com/200", // 두 번째 이미지
        "https://via.placeholder.com/200", // 세 번째 이미지
      ],
      jobOpenings: [],
    },
  };

  const company = mockCompanies[id];

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <DetailContainer>
      <RoundedRectangle>
        <LeftSection>
          <TopSection>
            <CompanyName>회사명: {company.name}</CompanyName>
            <JobTitle>{company.title}</JobTitle>
          </TopSection>
          <Divider />
          <BottomSection>{company.introduction}</BottomSection>
        </LeftSection>

        <VerticalDivider />

        <RightSection>
          {/* 회사 로고 */}
          <CompanyLogo src={company.logo} alt="회사 로고" />

          {/* 기업 정보 컨테이너 */}
          <CompanyInfoContainer>
            <CompanyInfoText>기업정보</CompanyInfoText>
            <CompanyDetailText>{company.city}</CompanyDetailText>
            <CompanyDetailText>{company.numEmployees}명</CompanyDetailText>
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
      {activeTab === "openings" && (
        <JobOpenings jobOpenings={company.jobOpenings} />
      )}
    </DetailContainer>
  );
};

export default CompanyDetail;
