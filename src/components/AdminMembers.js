import React from "react";
import { Link } from "react-router-dom"; // Link를 import하여 라우팅에 사용
import styled from "styled-components";
import resumeIcon from "../assets/resume.svg"; // resume.svg 파일을 불러오기

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
  top: 0;
  z-index: 2; /* 헤더를 위로 올리기 */
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #b3b3b3;
  text-align: center;
`;

const ResumeIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const membersData = [
  {
    id: 1,
    name: "홍길동",
    dob: "1985-05-12",
    position: "개발자",
    experience: "5년",
    salary: "5000만원",
    resume: "미리보기",
  },
  {
    id: 2,
    name: "김철수",
    dob: "1990-02-28",
    position: "디자이너",
    experience: "3년",
    salary: "4000만원",
    resume: "미리보기",
  },
  {
    id: 3,
    name: "이영희",
    dob: "1987-07-18",
    position: "기획자",
    experience: "7년",
    salary: "6000만원",
    resume: "미리보기",
  },
  {
    id: 4,
    name: "박민수",
    dob: "1995-11-25",
    position: "마케터",
    experience: "2년",
    salary: "3500만원",
    resume: "미리보기",
  },
  {
    id: 5,
    name: "최현우",
    dob: "1982-04-22",
    position: "엔지니어",
    experience: "10년",
    salary: "7000만원",
    resume: "미리보기",
  },
  {
    id: 6,
    name: "이정민",
    dob: "1993-09-14",
    position: "데이터 분석가",
    experience: "4년",
    salary: "4500만원",
    resume: "미리보기",
  },
  {
    id: 7,
    name: "김지수",
    dob: "1997-01-01",
    position: "개발자",
    experience: "1년",
    salary: "3000만원",
    resume: "미리보기",
  },
  {
    id: 8,
    name: "손흥민",
    dob: "1989-07-08",
    position: "프론트엔드 개발자",
    experience: "6년",
    salary: "5500만원",
    resume: "미리보기",
  },
];

// AdminMembers 컴포넌트
const AdminMembers = () => {
  const totalMembers = membersData.length;
  const newMembers = membersData.filter(
    (member) => member.dob >= "1990-01-01"
  ).length;

  return (
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
              {membersData.map((member) => (
                <tr key={member.id}>
                  <TableData>{member.id}</TableData>
                  <TableData>
                    <Link to={`/admin/members/${member.id}`}>
                      {member.name}
                    </Link>
                  </TableData>
                  <TableData>{member.dob}</TableData>
                  <TableData>{member.position}</TableData>
                  <TableData>{member.experience}</TableData>
                  <TableData>{member.salary}</TableData>
                  <TableData>
                    <a
                      href={`/admin/${member.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ResumeIcon src={resumeIcon} alt="이력서 미리보기" />
                    </a>
                  </TableData>
                </tr>
              ))}
            </tbody>
          </MemberTable>
        </MemberTableWrapper>
      </MemberListContainer>
    </Container>
  );
};

export default AdminMembers;
