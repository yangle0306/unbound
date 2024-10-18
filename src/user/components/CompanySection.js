import React from "react";
import styled from "styled-components";
import CompanySVG from "../../assets/company.svg";
import MessageSVG from "../../assets/message.svg";

// 컨테이너 스타일 정의
const Container = styled.div`
  width: 535px;
  height: 202px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 20px 35px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

// 제목 스타일
const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 5px;
`;

// 구분선 스타일
const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;

// 텍스트 스타일 (기업이 없을 때)
const EmptyText = styled.p`
  font-size: 14px;
  color: #838383;
  margin-top: 5px;
`;

// 기업 목록을 감싸는 박스
const List = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

// 기업 항목 스타일
const Item = styled.div`
  width: 443px;
  height: 36px;
  background-color: ${(props) =>
    props.$index % 2 === 0 ? "#F8F9FF" : "#FFFFFF"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 0 10px;
`;

// 기업명 스타일
const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #313131;
`;

// 아이콘 그룹 스타일
const Icons = styled.div`
  display: flex;
  gap: 10px;
`;

// 아이콘 스타일
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
    <Container>
      <Title>지원 기업</Title>
      <Divider />
      <List>
        {companies && companies.length > 0 ? (
          companies.map((company, index) => (
            <Item key={index} $index={index}>
              <Name>{company.name}</Name>
              <Icons>
                <Icon src={CompanySVG} alt="Company" />
                <Icon src={MessageSVG} alt="Message" />
              </Icons>
            </Item>
          ))
        ) : (
          <EmptyText>아직 지원한 기업이 없습니다.</EmptyText>
        )}
      </List>
    </Container>
  );
};

export default CompanySection;
