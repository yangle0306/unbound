import React from "react";
import styled from "styled-components";
import CompanySVG from "../assets/company.svg";
import MessageSVG from "../assets/message.svg";

// 지원기업 관련 스타일 정의
const CompanyContainer = styled.div`
  width: 535px;
  height: 202px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 20px 35px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
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

const CompanyBox = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: auto; /* 세로 스크롤 가능하게 */
  overflow-x: hidden; /* 가로 스크롤 막기 */
`;

const CompanyItem = styled.div`
  width: 443px;
  height: 36px;
  background-color: ${(props) =>
    props.$index % 2 === 0 ? "#F8F9FF" : "#FFFFFF"}; /* 배경색 반복 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 0 10px; /* 패딩을 추가해 양 끝 공간 확보 */
`;

const CompanyName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #313131;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const CompanySection = ({ companies }) => {
  return (
    <CompanyContainer>
      <CompanyTitle>지원 기업</CompanyTitle>
      <Divider />
      <CompanyBox>
        {/* 기업이 있는 경우 렌더링 */}
        {companies && companies.length > 0 ? (
          companies.map((company, index) => (
            <CompanyItem key={index} $index={index}>
              <CompanyName>{company.name}</CompanyName>
              <IconGroup>
                <Icon src={CompanySVG} alt="Company" />
                <Icon src={MessageSVG} alt="Message" />
              </IconGroup>
            </CompanyItem>
          ))
        ) : (
          // 기업이 없을 경우 텍스트 표시
          <NoCompanyText>아직 지원한 기업이 없습니다.</NoCompanyText>
        )}
      </CompanyBox>
    </CompanyContainer>
  );
};

export default CompanySection;
