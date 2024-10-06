import React from "react";
import styled from "styled-components";

// CSS 스타일 정의
const JobOpeningsContainer = styled.div`
  width: 680px;
  height: auto; /* 내용에 따라 높이 자동 설정 */
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap; /* 여러 줄로 감싸기 */
  justify-content: space-between;
  gap: 20px; /* 카드 간의 간격 추가 */
  align-items: center;
`;

const JobOpeningsRoundedRectangle = styled.div`
  width: 330px;
  height: 258px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 상단과 하단 요소들을 공간을 나누어 배치 */
  align-items: center;
  padding: 20px;
`;

// 회사명 스타일
const CompanyName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131; /* 텍스트 색상 */
  margin-left: 10px;
`;

// 모집 제목 스타일 (좌측 정렬)
const JobTitle = styled.p`
  font-size: 15px;
  font-weight: bold;
  color: #313131; /* 텍스트 색상 */
  margin-bottom: 10px;
  text-align: left; /* 좌측 정렬 */
  width: 100%; /* 부모 요소 전체 너비 사용 */
`;

// 상시모집중 텍스트 스타일
const StatusText = styled.p`
  font-size: 8px;
  font-weight: bold;
  color: #838383; /* 초록색 텍스트 */
`;

// 회사 로고와 이름을 같은 줄에 배치하는 컨테이너
const CompanyInfoRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

// 회사 로고 스타일
const CompanyLogo = styled.img`
  width: 69px;
  height: 69px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  border-radius: 10%;
`;

// 하단에 텍스트와 버튼을 같은 줄로 배치하는 컨테이너
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: auto; /* 하단에 고정하기 위해 사용 */
`;

// "엔트리하기" 버튼 스타일 - 동그라미 체크 추가
const EntryButton = styled.button`
  width: 97px;
  height: 20px;
  background-color: #ffc700;
  color: #1e388b;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  position: relative;
  padding-left: 25px; /* 동그라미 체크를 위한 여유 공간 */

  /* 동그라미 체크 추가 */
  &::before {
    content: "✔"; /* 체크 표시 */
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #1e388b; /* 체크 표시 색상 */
    background-color: #ffc700;
    border-radius: 50%; /* 동그라미 모양 */
    border: 1.5px solid #1e388b; /* 굵은 동그라미 */
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background-color: #e5b600;
  }
`;

// "자세히보기" 링크 스타일 - 우측 정렬 및 화살표 추가
const MoreDetailsLink = styled.a`
  font-size: 12px;
  color: #313131;
  text-decoration: none;
  cursor: pointer;
  margin-left: auto; /* Flexbox에서 우측 정렬 */

  /* 화살표 추가 */
  &::after {
    content: " ᐳ"; /* 화살표 추가 */
    font-size: 12px;
    color: #313131;
    transition: color 0.3s ease;
  }

  &:hover::after {
    color: #1e388b; /* 호버 시 화살표 색상 변경 */
  }
`;

const JobOpenings = () => {
  // 더미 데이터 - 나중에 서버로부터 받아올 데이터의 구조를 가정
  const jobOpeningsData = [
    {
      id: 1,
      companyName: "ABC Corp",
      jobTitle: "Software Engineer",
      logo: "https://via.placeholder.com/69",
      status: "상시 모집 중",
    },
    {
      id: 2,
      companyName: "XYZ Ltd",
      jobTitle: "Data Analyst",
      logo: "https://via.placeholder.com/69",
      status: "상시 모집 중",
    },
    {
      id: 3,
      companyName: "Tech Solutions",
      jobTitle: "Full Stack Developer",
      logo: "https://via.placeholder.com/69",
      status: "상시 모집 중",
    },
    // 추가 데이터...
  ];

  return (
    <JobOpeningsContainer>
      {jobOpeningsData.map((job) => (
        <JobOpeningsRoundedRectangle key={job.id}>
          {/* 회사 로고와 회사명 */}
          <MoreDetailsLink href="#">자세히보기</MoreDetailsLink>
          <CompanyInfoRow>
            <CompanyLogo src={job.logo} alt="회사 로고" />
            <CompanyName>{job.companyName}</CompanyName>
          </CompanyInfoRow>

          {/* 모집 제목 */}
          <JobTitle>{job.jobTitle}</JobTitle>

          {/* 하단의 상시모집 텍스트와 엔트리 버튼 */}
          <BottomRow>
            <StatusText>{job.status}</StatusText>
            <EntryButton>엔트리하기</EntryButton>
          </BottomRow>
        </JobOpeningsRoundedRectangle>
      ))}
    </JobOpeningsContainer>
  );
};

export default JobOpenings;
