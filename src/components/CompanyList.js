import React from "react";
import styled from "styled-components";

import EntryIcon from "../assets/entry.svg"; // entry.svg 파일을 불러옵니다

// 최상위 리스트 컨테이너 스타일 (배경색 제거)
const CompanyListContainer = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  margin-top: 60px;
  box-sizing: border-box;
`;

// 리스트의 제목 스타일
const ListTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 20px;
`;

// 기업 리스트를 감싸는 래퍼 (카드형식으로 한 줄에 4개 배치)
const CompanyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 칼럼 */
  gap: 20px; /* 카드 사이의 간격 */
`;

// 기업 항목 스타일 (카드 크기 고정, 이미지 추가)
const CompanyItem = styled.div`
  width: 300px;
  height: 350px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px); /* 호버시 카드 살짝 위로 이동 */
  }
`;

// 이미지 스타일 (패딩 제거, 카드 상단에 딱 붙음)
const CompanyImage = styled.img`
  width: 100%; /* 이미지가 카드의 너비에 딱 맞도록 설정 */
  height: 125px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

// 텍스트 컨테이너 스타일 (이미지 제외한 부분에 패딩 적용)
const TextContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* 텍스트 영역 전체 높이를 채워줌 */
  text-align: left; /* 텍스트 좌측 정렬 */
`;

// 기업 이름 스타일 (좌측 정렬)
const CompanyName = styled.h3`
  font-size: 12px;
  color: #1e388b;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
`;

// 모집 제목 스타일 (좌측 정렬)
const JobTitle = styled.p`
  font-size: 15px;
  color: #313131;
  font-weight: bold;
  margin: 5px 0;
  text-align: left;
`;

// 본사 소재지 및 사원수를 감싸는 컨테이너 (같은 줄 배치)
const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  font-weight: bold;
  color: #313131;
  margin: 5px 0;
`;

// 본사 소재지 스타일 (좌측)
const CompanyLocation = styled.span``;

// 사원수 스타일 (우측)
const EmployeeCount = styled.span``;

// 기업 소개 스타일 (간략, 100% 너비로 수정, 배경색 #FBFBFB)
const CompanyDescription = styled.p`
  width: 100%; /* 고정 너비 대신 부모 컨테이너에 맞춤 */
  height: 75px;
  background-color: #fbfbfb;
  font-size: 14px;
  color: #666;
  padding: 10px;
  box-sizing: border-box;
  margin: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; /* 줄바꿈 허용 */
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄 표시 */
  -webkit-box-orient: vertical;
  line-height: 1.4; /* 줄 간격 설정 */
  border-radius: 4px;
`;

// 상시 모집 텍스트와 버튼을 감싸는 컨테이너
const StatusAndButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

// 상시 모집 텍스트 스타일
const HiringStatus = styled.p`
  font-size: 8px;
  color: #838383;
  font-weight: bold;
  margin: 0;
`;

// 엔트리하기 버튼 스타일 (78x16 크기, 배경색: #FFC700, 텍스트색: #1E388B)
const EntryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc700;
  color: #1e388b;
  border: none;
  border-radius: 5px;
  width: 78px;
  height: 16px;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;

  &:hover {
    background-color: #e5b600; /* hover 시 배경 색상 변경 */
  }

  img {
    margin-right: 5px; /* 이미지와 텍스트 사이 간격 */
  }
`;

// 기업 리스트 컴포넌트 정의
const CompanyList = () => {
  // 예시 데이터: 기업 이름, 모집 제목, 본사 소재지, 사원수, 간단한 소개, 이미지 URL
  const companies = [
    {
      name: "Company A",
      jobTitle: "Software Engineer",
      location: "Seoul, South Korea",
      employeeCount: "500명",
      description:
        "회사 A는 테크 스타트업으로, 혁신적인 기술을 기반으로 다양한 프로젝트를 진행하고 있습니다.",
      imageUrl: "https://via.placeholder.com/300x125",
    },
    {
      name: "Company B",
      jobTitle: "Financial Analyst",
      location: "Busan, South Korea",
      employeeCount: "200명",
      description:
        "회사 B는 금융 서비스를 제공하며, 고객 맞춤형 솔루션을 제공합니다.",
      imageUrl: "https://via.placeholder.com/300x125",
    },
    {
      name: "Company C",
      jobTitle: "Healthcare Specialist",
      location: "Incheon, South Korea",
      employeeCount: "1000명",
      description:
        "회사 C는 헬스케어 산업의 선두주자로, 고객의 건강을 책임지고 있습니다.",
      imageUrl: "https://via.placeholder.com/300x125",
    },
    {
      name: "Company D",
      jobTitle: "Education Consultant",
      location: "Daegu, South Korea",
      employeeCount: "300명",
      description:
        "회사 D는 교육 분야에 중점을 두고, 다양한 교육 프로그램을 제공합니다.",
      imageUrl: "https://via.placeholder.com/300x125",
    },
    {
      name: "Company O",
      jobTitle: "Education Consultant",
      location: "Daegu, South Korea",
      employeeCount: "300명",
      description:
        "회사 D는 교육 분야에 중점을 두고, 다양한 교육 프로그램을 제공합니다.",
      imageUrl: "https://via.placeholder.com/300x125",
    },
  ];

  return (
    <CompanyListContainer>
      <ListTitle>기업 리스트</ListTitle> {/* 제목 추가 */}
      <CompanyGrid>
        {" "}
        {/* 카드 그리드 적용 */}
        {companies.map((company, index) => (
          <CompanyItem key={index}>
            <CompanyImage
              src={company.imageUrl}
              alt={`${company.name} 이미지`}
            />
            <TextContainer>
              {/* 기업명 */}
              <CompanyName>{company.name}</CompanyName>
              {/* 모집 제목 */}
              <JobTitle>{company.jobTitle}</JobTitle>
              <InfoRow>
                <CompanyLocation>
                  본사 소재지: {company.location}
                </CompanyLocation>
                <EmployeeCount>사원수: {company.employeeCount}</EmployeeCount>
              </InfoRow>
              {/* 기업 소개 - 간략 */}
              <CompanyDescription>{company.description}</CompanyDescription>
              <StatusAndButtonContainer>
                {" "}
                <HiringStatus>상시모집 중</HiringStatus>
                <EntryButton>
                  <img src={EntryIcon} alt="Entry Icon" />{" "}
                  {/* entry.svg 아이콘 */}
                  엔트리하기
                </EntryButton>
              </StatusAndButtonContainer>
            </TextContainer>
          </CompanyItem>
        ))}
      </CompanyGrid>
    </CompanyListContainer>
  );
};

export default CompanyList;
