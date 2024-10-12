import React from "react";
import styled from "styled-components";

// 컨테이너 스타일
const Container = styled.div`
  width: 300px;
  height: 202px;
  border-radius: 15px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

// 제목 스타일
const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 10px;
`;

// 구분선 스타일
const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;

// 그리드 스타일
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  height: 100%;
`;

// 텍스트 아이템 스타일
const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// 아이템 제목 스타일
const ItemTitle = styled.h4`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
`;

// 아이템 설명 스타일
const ItemDesc = styled.p`
  font-size: 12px;
  color: #838383;
  margin-top: 5px;
`;

const ContentSection = ({ user }) => {
  const resume = user?.resume;

  return (
    <Container>
      <Title>내용</Title>
      <Divider />
      <Grid>
        <Item>
          <ItemTitle>경력기간</ItemTitle>
          <ItemDesc>
            {resume
              ? resume.careers.map((career) => career.period).join(", ")
              : "이력서를 등록하세요"}
          </ItemDesc>
        </Item>
        <Item>
          <ItemTitle>희망포지션</ItemTitle>
          <ItemDesc>
            {resume ? resume.desiredPosition : "이력서를 등록하세요"}
          </ItemDesc>
        </Item>
        <Item>
          <ItemTitle>희망연봉</ItemTitle>
          <ItemDesc>
            {resume ? resume.desiredSalary : "이력서를 등록하세요"}
          </ItemDesc>
        </Item>
        <Item>
          <ItemTitle>희망근무지역</ItemTitle>
          <ItemDesc>
            {resume ? resume.desiredLocation : "이력서를 등록하세요"}
          </ItemDesc>
        </Item>
      </Grid>
    </Container>
  );
};

export default ContentSection;
