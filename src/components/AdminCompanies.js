import React, { useState } from "react";
import styled from "styled-components";
import plusIcon from "../assets/plus.svg"; // 플러스 아이콘 불러오기
import searchIcon from "../assets/search.svg"; // 돋보기 아이콘 불러오기

const Container = styled.div`
  width: 1280px;
  margin: 60px auto;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #313131;
`;

const CompanyListContainer = styled.div`
  width: 100%;
  margin-top: 100px;
`;

const TableTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TableTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin: auto 0;
`;

const SearchContainer = styled.div`
  margin-left: auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 373px; /* 너비 373px */
  height: 44px; /* 높이 44px */
  padding: 10px 20px 10px 40px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;

  /* placeholder 색상 변경 */
  &::placeholder {
    color: #1e388b; /* 연한 회색 */
    opacity: 1; /* 크롬 등에서 opacity 필요할 수 있음 */
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  width: 15px; /* 아이콘 크기 조정 */
  height: 15px; /* 아이콘 크기 조정 */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%231E388B"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M9.5 17A7.5 7.5 0 109.5 2a7.5 7.5 0 000 15z" /></svg>');
  background-size: cover;

  /* 색상 변경 (여기서 #1E388B ) */
  background-color: transparent; /* 배경 투명화 */
`;

const RegisterButton = styled.button`
  width: 140px;
  height: 44px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #313131;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #e9e9e9;
  }

  &::after {
    content: "+";
    font-size: 36px;
    color: #dde2f1;
    margin-left: 2px;
  }
`;

const CompanyTableWrapper = styled.div`
  width: 100%;
  max-height: 450px;
  overflow-y: auto;
  border: 1px solid #d9d9d9;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

const CompanyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f8f9ff;
  color: #313131;
  padding: 15px;
  border: 1px solid #d9d9d9;
  position: sticky;
  top: -1px;
  z-index: 1;

  &:not(:last-child) {
    border-right: 1px solid #d9d9d9;
  }
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #d9d9d9;
  text-align: center;
  vertical-align: middle;
`;

const IconButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

// AdminCompanies 컴포넌트
const AdminCompanies = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어를 저장하는 상태
  const [companyList] = useState([
    {
      id: 1,
      registrationDate: "2024-10-10",
      language: "한국어",
      name: "ABC Corp",
      entryCount: 5,
      recruitmentCount: 2,
    },
    {
      id: 2,
      registrationDate: "2024-10-12",
      language: "English",
      name: "XYZ Ltd",
      entryCount: 10,
      recruitmentCount: 4,
    },
    {
      id: 3,
      registrationDate: "2024-10-15",
      language: "日本語",
      name: "JPN Co",
      entryCount: 3,
      recruitmentCount: 1,
    },
    {
      id: 4,
      registrationDate: "2024-10-09",
      language: "한국어",
      name: "대한무역",
      entryCount: 7,
      recruitmentCount: 3,
    },
    {
      id: 5,
      registrationDate: "2024-10-11",
      language: "中文",
      name: "Shanghai Int",
      entryCount: 12,
      recruitmentCount: 5,
    },
    {
      id: 6,
      registrationDate: "2024-10-13",
      language: "English",
      name: "Tech Innovations",
      entryCount: 6,
      recruitmentCount: 2,
    },
    {
      id: 7,
      registrationDate: "2024-10-14",
      language: "한국어",
      name: "Hanwha",
      entryCount: 8,
      recruitmentCount: 4,
    },
    {
      id: 8,
      registrationDate: "2024-10-16",
      language: "Français",
      name: "Paris Tech",
      entryCount: 4,
      recruitmentCount: 1,
    },
    {
      id: 9,
      registrationDate: "2024-10-17",
      language: "Deutsch",
      name: "Berlin Corp",
      entryCount: 11,
      recruitmentCount: 5,
    },
    {
      id: 10,
      registrationDate: "2024-10-18",
      language: "English",
      name: "Global Ventures",
      entryCount: 9,
      recruitmentCount: 3,
    },
  ]);

  // 검색어로 기업명과 언어 필터링
  const filteredCompanies = companyList.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value); // 검색어 상태 업데이트
  };

  return (
    <Container>
      <Title>기업관리</Title>

      <CompanyListContainer>
        <TableTitleContainer>
          <TableTitle>업체 리스트</TableTitle>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              placeholder="기업 검색"
              value={searchQuery} // 검색어 상태 반영
              onChange={handleSearchInput} // 입력 변화 처리
            />
          </SearchContainer>
          <RegisterButton onClick={() => alert("업체 등록 기능 구현 필요")}>
            기업 등록
          </RegisterButton>
        </TableTitleContainer>
        <CompanyTableWrapper>
          <CompanyTable>
            <thead>
              <tr>
                <TableHeader>번호</TableHeader>
                <TableHeader>등록일</TableHeader>
                <TableHeader>언어</TableHeader>
                <TableHeader>기업명</TableHeader>
                <TableHeader>엔트리</TableHeader>
                <TableHeader>모집등록</TableHeader>
                <TableHeader>상세보기</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company, index) => (
                <tr key={company.id}>
                  <TableData>{index + 1}</TableData>
                  <TableData>{company.registrationDate}</TableData>
                  <TableData>{company.language}</TableData>
                  <TableData>{company.name}</TableData>
                  <TableData>{company.entryCount}</TableData>
                  <TableData>
                    <IconButton src={plusIcon} alt="모집등록" />
                  </TableData>
                  <TableData>
                    <IconButton src={searchIcon} alt="상세보기" />
                  </TableData>
                </tr>
              ))}
            </tbody>
          </CompanyTable>
        </CompanyTableWrapper>
      </CompanyListContainer>
    </Container>
  );
};

export default AdminCompanies;
