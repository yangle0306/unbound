import React, { useState } from "react";
import styled from "styled-components";
import settingsIcon from "../assets/settings.svg"; // 설정 아이콘 불러오기
import Modal from "./Modal"; // Modal 컴포넌트
import RegisterStaff from "./RegisterStaff";

// 스타일 정의
const Container = styled.div`
  width: 1280px;
  margin: 60px auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬로 수정 */
  align-items: center; /* 세로로도 중앙 배치 */
`;

const StatBox = styled.div`
  display: flex;
  width: 250px; /* 너비 250px */
  height: 40px; /* 높이 40px */
  border: 1px solid #d9d9d9; /* 전체 박스 테두리 */
  overflow: hidden; /* 자식 요소가 넘치지 않도록 */

  /* 두 번째 이후의 StatBox의 왼쪽 테두리를 제거 */
  &:not(:first-child) {
    border-left: none;
  }
`;

const StatText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px; /* 문자 부분 너비 */
  height: 100%;
  background-color: #dde2f1; /* 문자 부분 배경 색상 */
  color: #313131;
  font-weight: bold;
`;

const StatNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px; /* 숫자 부분 너비 */
  height: 100%;
  background-color: #f9f9f9; /* 숫자 부분 배경 색상 */
  color: #313131;
  font-weight: bold;
`;

const StaffListContainer = styled.div`
  width: 100%;
  margin-top: 50px;
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

const RegisterButton = styled.button`
  width: 140px;
  height: 44px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center; /* 텍스트와 플러스를 수평 중앙 정렬 */
  background-color: #ffffff;
  color: #313131;
  border: 1px solid #d9d9d9;
  border-radius: 5px; /* 둥근 직사각형 모양 */
  cursor: pointer;

  &:hover {
    background-color: #e9e9e9;
  }

  /* 플러스 아이콘 스타일 */
  &::after {
    content: "+";
    font-size: 36px;
    color: #dde2f1;
    margin-left: 2px;
  }
`;

const StaffTableWrapper = styled.div`
  width: 100%;
  max-height: 350px;
  overflow-y: auto;
  border: 1px solid #d9d9d9;

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

const StaffTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f8f9ff;
  color: #313131;
  padding: 15px;
  border: 1px solid #d9d9d9;
  position: sticky;
  top: -1px; /* 헤더를 살짝 더 위로 고정 */
  z-index: 1; /* 헤더가 다른 요소들 위에 표시되도록 설정 */

  /* 각 헤더 사이에 테두리를 추가 */
  &:not(:last-child) {
    border-right: 1px solid #d9d9d9; /* 오른쪽에 테두리 추가 */
  }
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #d9d9d9;
  text-align: center;
`;

const SettingsIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

// 직원 데이터
const staffData = [
  {
    id: 1,
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
  },
  {
    id: 2,
    name: "김철수",
    email: "kim@example.com",
    phone: "010-8765-4321",
  },
  {
    id: 3,
    name: "이영희",
    email: "lee@example.com",
    phone: "010-1111-2222",
  },
  {
    id: 4,
    name: "박민수",
    email: "park@example.com",
    phone: "010-3333-4444",
  },
  {
    id: 5,
    name: "최현우",
    email: "choi@example.com",
    phone: "010-5555-6666",
  },
  // 추가된 직원들
  {
    id: 6,
    name: "정우성",
    email: "jung@example.com",
    phone: "010-7777-8888",
  },
  {
    id: 7,
    name: "강소라",
    email: "kang@example.com",
    phone: "010-9999-1010",
  },
  {
    id: 8,
    name: "배수지",
    email: "bae@example.com",
    phone: "010-1212-3434",
  },
  {
    id: 9,
    name: "공유",
    email: "gong@example.com",
    phone: "010-4545-5656",
  },
  {
    id: 10,
    name: "한지민",
    email: "han@example.com",
    phone: "010-6767-7878",
  },
  {
    id: 11,
    name: "김유정",
    email: "kimy@example.com",
    phone: "010-8989-9090",
  },
  {
    id: 12,
    name: "정지훈",
    email: "jungj@example.com",
    phone: "010-1213-1415",
  },
  {
    id: 13,
    name: "손예진",
    email: "son@example.com",
    phone: "010-1617-1819",
  },
  {
    id: 14,
    name: "이민호",
    email: "lee@example.com",
    phone: "010-2021-2223",
  },
  {
    id: 15,
    name: "송중기",
    email: "song@example.com",
    phone: "010-2425-2627",
  },
];

// AdminStaff 컴포넌트
const AdminStaff = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const totalAdmin = 2; // 예시: 관리자 2명
  const totalGeneral = staffData.length - totalAdmin;

  return (
    <Container>
      <Title>전체 직원 관리</Title>

      <StatsContainer>
        <StatBox>
          <StatText>총 관리자</StatText>
          <StatNumber>{totalAdmin}명</StatNumber>
        </StatBox>
        <StatBox>
          <StatText>일반 관리자</StatText>
          <StatNumber>{totalGeneral}명</StatNumber>
        </StatBox>
      </StatsContainer>

      <StaffListContainer>
        <TableTitleContainer>
          <TableTitle>직원 리스트</TableTitle>
          <RegisterButton onClick={() => setModalOpen(true)}>
            직원계정 등록
          </RegisterButton>
        </TableTitleContainer>
        <StaffTableWrapper>
          <StaffTable>
            <thead>
              <tr>
                <TableHeader>번호</TableHeader>
                <TableHeader>이름</TableHeader>
                <TableHeader>이메일</TableHeader>
                <TableHeader>휴대폰 번호</TableHeader>
                <TableHeader>설정</TableHeader>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff) => (
                <tr key={staff.id}>
                  <TableData>{staff.id}</TableData>
                  <TableData>{staff.name}</TableData>
                  <TableData>{staff.email}</TableData>
                  <TableData>{staff.phone}</TableData>
                  <TableData>
                    <SettingsIcon
                      src={settingsIcon}
                      onClick={() => setModalOpen(true)}
                      alt="설정"
                    />
                  </TableData>
                </tr>
              ))}
            </tbody>
          </StaffTable>
        </StaffTableWrapper>
      </StaffListContainer>

      <Modal isOpen={isModalOpen}>
        <RegisterStaff onClose={() => setModalOpen(false)} />
      </Modal>
    </Container>
  );
};

export default AdminStaff;
