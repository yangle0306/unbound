import React from "react";
import styled from "styled-components";

// 지원기업 관련 스타일 정의
const CompanyContainer = styled.div`
  width: 535px;
  height: 202px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #313131;
`;

const CompanyTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 5px;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;

const NoCompanyText = styled.p`
  font-size: 14px;
  color: #838383;
  margin-top: 5px;
`;

const CompanySection = () => {
  return (
    <CompanyContainer>
      <CompanyTitle>지원 기업</CompanyTitle>
      <Divider />
      <NoCompanyText>아직 지원한 기업이 없습니다.</NoCompanyText>
    </CompanyContainer>
  );
};

export default CompanySection;
