import React, { useEffect, useState } from "react";
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
  text-align: center; /* 수평 중앙 정렬 */
  vertical-align: middle; /* 수직 중앙 정렬 */
`;

const SettingsIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

// AdminStaff 컴포넌트
const AdminStaff = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [adminCount, setAdminCount] = useState(0); // 총 관리자 수
  const [generalCount, setGeneralCount] = useState(0); // 일반 관리자 수
  const [staffList, setStaffList] = useState([]); // 직원 리스트
  const [selectedStaff, setSelectedStaff] = useState(null); // 선택한 직원의 정보 저장

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    const fetchStaffData = async () => {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/employees`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          const users = data.userList;

          // 관리자의 수와 일반 관리자의 수 계산
          const adminCount = users.filter(
            (user) => user.level === 0 || user.level === 1
          ).length;
          const generalCount = users.filter((user) => user.level === 1).length;

          setAdminCount(adminCount); // 총 관리자 수 (level 0 + level 1)
          setGeneralCount(generalCount); // 일반 관리자 수 (level 1만)
          setStaffList(users); // 직원 리스트 업데이트
        }
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaffData();
  }, []);

  // 직원 정보 보기
  const handleSettingsClick = (staff) => {
    setSelectedStaff(staff); // 선택한 직원 설정
    setModalOpen(true); // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedStaff(null); // 선택한 직원 초기화
    setModalOpen(false); // 모달 닫기
  };

  return (
    <Container>
      <Title>전체 직원 관리</Title>

      <StatsContainer>
        <StatBox>
          <StatText>총 관리자</StatText>
          <StatNumber>{adminCount}명</StatNumber>
        </StatBox>
        <StatBox>
          <StatText>일반 관리자</StatText>
          <StatNumber>{generalCount}명</StatNumber>
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
              {staffList.map((staff, index) => (
                <tr key={staff.id}>
                  <TableData>{index + 1}</TableData>
                  <TableData>{staff.name}</TableData>
                  <TableData>{staff.email}</TableData>
                  <TableData>{staff.phone}</TableData>
                  <TableData>
                    <SettingsIcon
                      src={settingsIcon}
                      onClick={() => handleSettingsClick(staff)}
                      alt="설정"
                    />
                  </TableData>
                </tr>
              ))}
            </tbody>
          </StaffTable>
        </StaffTableWrapper>
      </StaffListContainer>

      {/* 직원 정보 모달 */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          <RegisterStaff staff={selectedStaff} onClose={closeModal} />
        </Modal>
      )}
    </Container>
  );
};

export default AdminStaff;
