import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link를 import하여 라우팅에 사용
import styled from "styled-components";
import resumeIcon from "../../assets/resume.svg"; // resume.svg 파일을 불러오기
import Modal from "../../components/Modal";
import ResumePreview from "../components/ResumePreview";

// 스타일 정의
const Container = styled.div`
  width: 1280px;
  margin: 60px auto;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 요소를 하단에 배치 */
  gap: 20px;
`;

const OldMembersBox = styled.div`
  width: 300px;
  height; 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9; /* 각 아이템에 테두리 추가 */
`;

const NewMembersBox = styled.div`
  width: 300px;
  height; 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9; /* 각 아이템에 테두리 추가 */
`;

const MembersLabelItem = styled.p`
  font-size: 15px;
  color: #1e1e1e;
  padding: 10px;
  width: 100%; /* 아이템 크기 */
  text-align: center;
  background-color: #f8f9ff;
  border-right: 1px solid #d9d9d9; /* 각 아이템에 테두리 추가 */
`;

const MembersNumberItem = styled.p`
  font-size: 15px;
  color: #1e1e1e;
  padding: 10px;
  width: 100%; /* 아이템 크기 */
  text-align: center;
`;

const MemberListContainer = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const TableTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 20px;
`;

const MemberTableWrapper = styled.div`
  width: 100%;
  max-height: 350px;
  overflow-y: auto;
  border: 1px solid #ddd;
`;

const MemberTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #dde2f1;
  color: #313131;
  padding: 10px;
  border: 1px solid #b3b3b3;
  position: sticky;
  top: -1px;
  z-index: 2; /* 헤더를 위로 올리기 */
  text-align: center; /* 중앙 정렬 */
  vertical-align: middle; /* 수직 정렬 */
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #b3b3b3;
  text-align: center; /* 중앙 정렬 */
  vertical-align: middle; /* 수직 정렬 */
`;

const ResumeIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Member = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [membersData, setMembersData] = useState([]); // 상태 추가
  const [selectedMemberId, setSelectedMemberId] = useState(null); // 선택된 회원의 ID 상태 추가

  // 로컬 스토리지에서 토큰 가져오기
  const token = localStorage.getItem("token");

  // API 요청을 위한 useEffect 훅
  useEffect(() => {
    const fetchMembersData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
            },
          }
        );
        const data = await response.json();

        // 응답 데이터에서 필요한 부분만 추출하여 상태 업데이트
        if (data.success) {
          setMembersData(data.userList);
        }
      } catch (error) {
        console.error("회원 데이터를 가져오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchMembersData();
  }, [token]); // token이 변경될 때마다 새로 요청

  // 현재 날짜와 일주일 전 날짜 계산
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  // 일주일 이내에 가입한 회원 계산
  const newMembers = membersData.filter(
    (member) => new Date(member.createdAt) >= oneWeekAgo
  ).length;

  const totalMembers = membersData.length;

  // 이력서 아이콘 클릭 시 모달을 열고 선택된 회원의 ID 설정
  const handleResumeIconClick = (memberId) => {
    setSelectedMemberId(memberId); // 선택된 회원 ID 저장
    setModalOpen(true); // 모달 열기
  };

  return (
    <>
      <Container>
        <Title>회원관리</Title>

        <StatsContainer>
          <OldMembersBox>
            <MembersLabelItem>전체 회원수</MembersLabelItem>
            <MembersNumberItem>{totalMembers}명</MembersNumberItem>
          </OldMembersBox>
          <NewMembersBox>
            <MembersLabelItem>신규 회원수</MembersLabelItem>
            <MembersNumberItem>{newMembers}명</MembersNumberItem>
          </NewMembersBox>
        </StatsContainer>

        <MemberListContainer>
          <TableTitle>회원 리스트</TableTitle>
          <MemberTableWrapper>
            <MemberTable>
              <thead>
                <tr>
                  <TableHeader>번호</TableHeader>
                  <TableHeader>이름</TableHeader>
                  <TableHeader>생년월일</TableHeader>
                  <TableHeader>포지션</TableHeader>
                  <TableHeader>경력기간</TableHeader>
                  <TableHeader>희망연봉</TableHeader>
                  <TableHeader>이력서 미리보기</TableHeader>
                </tr>
              </thead>
              <tbody>
                {membersData.map((member, index) => (
                  <tr key={member.id}>
                    <TableData>{index + 1}</TableData>
                    <TableData>
                      <Link
                        to={`/admin/members/${index + 1}`} // 특정 경로로 이동
                        state={{ memberId: member.id }} // member.id만 state로 전달
                      >
                        {member.name}
                      </Link>
                    </TableData>
                    <TableData>{member.birth}</TableData>
                    <TableData>{member.desiredPosition || "-"}</TableData>
                    <TableData>{member.totalCareerYear}</TableData>
                    <TableData>{member.desiredSalary || "-"}</TableData>
                    <TableData>
                      <ResumeIcon
                        src={resumeIcon}
                        onClick={() => handleResumeIconClick(member.id)} // 클릭 시 해당 member의 ID 저장
                        alt="이력서 미리보기"
                      />
                    </TableData>
                  </tr>
                ))}
              </tbody>
            </MemberTable>
          </MemberTableWrapper>
        </MemberListContainer>
      </Container>

      <Modal isOpen={isModalOpen}>
        {selectedMemberId && (
          <ResumePreview
            memberId={selectedMemberId} // 선택된 member ID를 ResumePreview에 전달
            onClose={() => setModalOpen(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default Member;
