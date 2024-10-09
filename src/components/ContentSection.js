import React from "react";
import styled from "styled-components";

// 새로운 내용 컨테이너 스타일
const ContentContainer = styled.div`
  width: 300px;
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

const ContentTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;

const TextGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  height: 100%;
`;

const TextItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ItemTitle = styled.h4`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
`;

const ItemDescription = styled.p`
  font-size: 12px;
  color: #838383;
  margin-top: 5px;
`;

const ContentSection = ({ user }) => {
  const resume = user?.resume; // 이력서가 있을 때만 데이터를 가져옴

  return (
    <ContentContainer>
      <ContentTitle>내용</ContentTitle>
      <Divider />
      <TextGrid>
        <TextItem>
          <ItemTitle>경력기간</ItemTitle>
          <ItemDescription>
            {resume
              ? resume.careers.map((career) => career.period).join(", ")
              : "이력서를 등록하세요"}
          </ItemDescription>
        </TextItem>
        <TextItem>
          <ItemTitle>희망포지션</ItemTitle>
          <ItemDescription>
            {resume ? resume.desiredPosition : "이력서를 등록하세요"}
          </ItemDescription>
        </TextItem>
        <TextItem>
          <ItemTitle>희망연봉</ItemTitle>
          <ItemDescription>
            {resume ? resume.desiredSalary : "이력서를 등록하세요"}
          </ItemDescription>
        </TextItem>
        <TextItem>
          <ItemTitle>희망근무지역</ItemTitle>
          <ItemDescription>
            {resume ? resume.desiredLocation : "이력서를 등록하세요"}
          </ItemDescription>
        </TextItem>
      </TextGrid>
    </ContentContainer>
  );
};

export default ContentSection;
