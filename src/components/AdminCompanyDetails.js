import React, { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  width: 1011px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 60px;
`;

const TableWrapper = styled.div`
  width: 100%;
  height: 450px;
  overflow-y: auto;
`;

const RecruitmentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f8f9ff;
  color: #313131;
  padding: 15px;
  border: 1px solid #d9d9d9;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #d9d9d9;
  text-align: center; /* 가로 중앙 정렬 */
  vertical-align: middle; /* 세로 중앙 정렬 */
`;

const CloseButton = styled.button`
  align-self: center;
  width: 100px;
  height: 40px;
  background-color: #f8f9ff;
  color: #1e1e1e;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #d9d9d9;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 63px;
  height: 32px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d9d9d9;
  border-radius: 32px;

  &::before {
    position: absolute;
    content: "${(props) => (props.$isActive ? "✓" : "")}";
    color: ${(props) => (props.$isActive ? "#d9d9d9" : "#838383")};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 24px;
    left: 4px;
    bottom: 4px;
    background-color: ${(props) => (props.$isActive ? "#1E388B" : "#838383")};
    border-radius: 50%;
    font-size: 16px;
    transform: ${(props) => (props.$isActive ? "translateX(31px)" : "none")};
  }

  /* ON/OFF 텍스트 추가 */
  &::after {
    content: "${(props) => (props.$isActive ? "ON" : "OFF")}";
    position: absolute;
    top: 50%;
    left: ${(props) => (props.$isActive ? "5px" : "30px")};
    transform: translateY(-50%);
    font-size: 15px;
    color: #313131;
    font-weight: bold;
  }
`;

const ModifyButton = styled.button`
  padding: 8px 12px;
  background-color: #1e388b;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #152b69;
  }
`;

const AdminCompanyDetails = ({ onClose, recruitmentList }) => {
  const [recruitments, setRecruitments] = useState(recruitmentList);

  const toggleStatus = (id) => {
    setRecruitments((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  return (
    <ModalContainer>
      <Title>모집 리스트</Title>
      <TableWrapper>
        <RecruitmentTable>
          <thead>
            <tr>
              <TableHeader>모집일</TableHeader>
              <TableHeader>모집제목</TableHeader>
              <TableHeader>모집상태</TableHeader>
              <TableHeader>비고</TableHeader>
            </tr>
          </thead>
          <tbody>
            {recruitments.map((item, index) => (
              <tr key={index}>
                <TableData>{item.date}</TableData>
                <TableData>{item.title}</TableData>
                <TableData>
                  <ToggleSwitch>
                    <Slider
                      $isActive={item.status}
                      onClick={() => toggleStatus(item.id)}
                    />
                  </ToggleSwitch>
                </TableData>
                <TableData>
                  <ModifyButton>수정하기</ModifyButton>
                </TableData>
              </tr>
            ))}
          </tbody>
        </RecruitmentTable>
      </TableWrapper>
      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalContainer>
  );
};

export default AdminCompanyDetails;
