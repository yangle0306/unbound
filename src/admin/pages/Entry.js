import React from "react";
import styled from "styled-components";

// 스타일 정의
const Container = styled.div`
  width: 1280px;
  margin: 60px auto;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 120px;
  text-align: left;
`;

const EntriesListTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 10px;
`;

const EntriesListContainer = styled.div`
  width: 100%;
  max-height: 350px; /* 리스트의 최대 높이를 설정하여 스크롤 가능하게 */
  overflow-y: auto; /* 세로 스크롤 */
  border: 1px solid #ddd;

  /* 스크롤바 커스터마이징 */
  /* Webkit 기반 브라우저에서 스크롤바 크기 및 스타일 조정 */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; /* 스크롤바의 색상 */
    border-radius: 4px; /* 스크롤바 둥글게 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* 스크롤바에 마우스 오버 시 색상 변경 */
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* 스크롤바 트랙 색상 */
  }
`;

const EntriesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #dde2f1;
  color: #313131;
  padding: 15px;
  border: 1px solid #ddd;
  position: sticky;
  top: -1px; /* 헤더를 살짝 더 위로 고정 */
  z-index: 1; /* 헤더가 다른 요소들 위에 표시되도록 설정 */

  /* 각 헤더 사이에 테두리를 추가 */
  &:not(:last-child) {
    border-right: 2px solid #bbb; /* 오른쪽에 테두리 추가 */
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  padding: 15px;
  border: 1px solid #ddd;
  text-align: center;
`;

const entriesData = [
  {
    company: "ABC Corp",
    jobTitle: "Software Engineer Software Engineer Software Engineer",
    name: "홍길동",
    manager: "김철수",
  },
  {
    company: "XYZ Inc.",
    jobTitle: "Data Analyst",
    name: "이영희",
    manager: "박민수",
  },
  {
    company: "Tech Solutions",
    jobTitle: "Frontend Developer",
    name: "최현우",
    manager: "이영희",
  },
  {
    company: "Global Tech",
    jobTitle: "Backend Developer",
    name: "박민수",
    manager: "최현우",
  },
  {
    company: "Innovatech",
    jobTitle: "UX/UI Designer",
    name: "김지수",
    manager: "홍길동",
  },
  {
    company: "Fast Enterprises",
    jobTitle: "Product Manager",
    name: "이영준",
    manager: "김철수",
  },
  {
    company: "Digital Ventures",
    jobTitle: "Data Scientist",
    name: "박영희",
    manager: "박민수",
  },
  {
    company: "Blue Ocean Corp",
    jobTitle: "DevOps Engineer",
    name: "최유리",
    manager: "이영희",
  },
  {
    company: "Green Energy Ltd.",
    jobTitle: "Project Manager",
    name: "한서준",
    manager: "김철수",
  },
  {
    company: "NextGen AI",
    jobTitle: "AI Engineer",
    name: "김민재",
    manager: "박민수",
  },
];

const Entry = () => {
  return (
    <Container>
      <Title>엔트리 관리</Title>
      <EntriesListTitle>엔트리 리스트</EntriesListTitle>{" "}
      {/* 리스트 상단에 텍스트 추가 */}
      <EntriesListContainer>
        <EntriesTable>
          <thead>
            <TableRow>
              <TableHeader>앤트리한 기업</TableHeader>
              <TableHeader>공고명</TableHeader>
              <TableHeader>이름</TableHeader>
              <TableHeader>담당자</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {entriesData.map((entry, index) => (
              <TableRow key={index}>
                <TableData>{entry.company}</TableData>
                <TableData>{entry.jobTitle}</TableData>
                <TableData>{entry.name}</TableData>
                <TableData>{entry.manager}</TableData>
              </TableRow>
            ))}
          </tbody>
        </EntriesTable>
      </EntriesListContainer>
    </Container>
  );
};

export default Entry;
