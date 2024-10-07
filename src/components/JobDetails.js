import React from "react";
import styled from "styled-components";

// 최상위 JobDetailsContainer 스타일
const JobDetailsContainer = styled.div`
  width: 680px;
  height: auto; /* 내용에 따라 높이 자동 설정 */
  margin: 10px auto;
  display: flex;
  flex-direction: column; /* 세로로 나열 */
  gap: 20px; /* 섹션 간격 추가 */
`;

// 엔트리하기 버튼 스타일 (너비를 100%로 설정하여 부모 요소의 너비에 맞춤)
const EntryButton = styled.button`
  width: 100%; /* 부모 요소의 너비인 680px을 상속받음 */
  height: 56px; /* 원하는 높이 설정 */
  background-color: #ffc700;
  color: #1e388b;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  display: flex; /* 플렉스를 사용하여 아이콘과 텍스트를 나란히 배치 */
  align-items: center; /* 수직 정렬 */
  justify-content: center; /* 텍스트 가운데 정렬 */
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  /* 동그라미 체크 추가 */
  &::before {
    content: "✔"; /* 체크 표시 */
    margin-right: 8px; /* 텍스트와 체크 표시 사이 간격 */
    font-size: 24px;
    color: #1e388b; /* 체크 표시 색상 */
    background-color: #ffc700;
    border-radius: 50%; /* 동그라미 모양 */
    border: 1.5px solid #1e388b; /* 굵은 동그라미 */
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background-color: #e5b600; /* 호버 시 색상 변경 */
  }
`;

// 기본 정보 컨테이너
const BasicInfoContainer = styled.div`
  width: 100%;
  height: 229px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left; /* 좌측 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 텍스트 요소를 세로로 균등하게 배치 */
`;

// 직무 정보 컨테이너
const JobInfoContainer = styled.div`
  width: 100%;
  height: 289px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left; /* 좌측 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 텍스트 요소를 세로로 균등하게 배치 */
`;

// 복지 정보 컨테이너
const WelfareInfoContainer = styled.div`
  width: 100%;
  height: 289px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left; /* 좌측 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 텍스트 요소를 세로로 균등하게 배치 */
`;

// 경력 정보 컨테이너
const ExperienceInfoContainer = styled.div`
  width: 100%;
  height: 289px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left; /* 좌측 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 텍스트 요소를 세로로 균등하게 배치 */
`;

// 구분선 스타일
const Divider = styled.hr`
  width: 100%;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 10px 0;
`;

// 제목 스타일 - 각 제목에 개별 패딩 추가
const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1e388b;
  padding: 10px 20px;
`;

// 텍스트를 중앙 정렬하는 스타일 - 개별 텍스트에 패딩 추가
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 세로로 균등하게 배치 */
  padding: 20px;
  height: 100%; /* 남은 공간을 모두 사용 */
`;

// 내용 텍스트 스타일 - 각 텍스트에 개별 패딩 추가
const SectionText = styled.p`
  font-size: 14px;
  color: #313131;
`;

const JobDetails = ({ job, onBack }) => {
  return (
    <JobDetailsContainer>
      {/* 기본 정보 섹션 */}
      <EntryButton>엔트리하기</EntryButton>
      {/* 기본 정보 섹션 */}
      <BasicInfoContainer>
        <SectionTitle>기본 정보</SectionTitle>
        <Divider />
        <ContentWrapper>
          <SectionText>- 회사명: {job.companyName}</SectionText>
          <SectionText>- 본사 소재지: {job.jobTitle}</SectionText>
          <SectionText>- 사원 수:</SectionText>
          <SectionText>- 포지션:</SectionText>
        </ContentWrapper>
      </BasicInfoContainer>

      {/* 직무 정보 섹션 */}
      <JobInfoContainer>
        <SectionTitle>직무 및 근무 조건</SectionTitle>
        <Divider />
        <ContentWrapper>
          <SectionText>- 직무 내용:</SectionText>
          <SectionText>- 개발 환경:</SectionText>
          <SectionText>- 구인의 매력:</SectionText>
          <SectionText>- 고용 형태:</SectionText>
          <SectionText>- 근무지:</SectionText>
          <SectionText>- 근무 시간:</SectionText>
        </ContentWrapper>
      </JobInfoContainer>

      {/* 복지 정보 섹션 */}
      <WelfareInfoContainer>
        <SectionTitle>복지 및 보상</SectionTitle>
        <Divider />
        <ContentWrapper>
          <SectionText>- 복리후생:</SectionText>
          <SectionText>- 휴일 및 휴가:</SectionText>
          <SectionText>- 흡연실유무:</SectionText>
          <SectionText>- 급여:</SectionText>
          <SectionText>- 상여:</SectionText>
          <SectionText>- 전형과정:</SectionText>
        </ContentWrapper>
      </WelfareInfoContainer>

      {/* 경력 정보 섹션 */}
      <ExperienceInfoContainer>
        <SectionTitle>경력 및 환영 요건</SectionTitle>
        <Divider />
        <ContentWrapper>
          <SectionText>- 경력:</SectionText>
          <SectionText>- 필요 일본어 수준:</SectionText>
          <SectionText>- 필요 영어 수준:</SectionText>
          <SectionText>- 필수스킬:</SectionText>
          <SectionText>- 환영요건:</SectionText>
          <SectionText>- 원하는 인재상:</SectionText>
        </ContentWrapper>
      </ExperienceInfoContainer>

      {/* 돌아가기 버튼 */}
      <button onClick={onBack}>Back to Job Openings</button>
    </JobDetailsContainer>
  );
};

export default JobDetails;
