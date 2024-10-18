import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EntryIcon from "../../assets/entry.svg"; // entry.svg 파일을 불러옵니다

// 최상위 리스트 컨테이너 스타일
const ListWrapper = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: 60px auto 40px;
`;

// 리스트 제목 스타일
const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 20px;
`;

// 그리드 레이아웃
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

// 기업 카드 스타일
const Card = styled.div`
  width: 300px;
  height: 350px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

// 이미지 스타일
const Image = styled.img`
  width: 100%;
  height: 125px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

// 텍스트 영역 스타일
const CardContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-align: left;
`;

// 기업 이름 스타일
const Name = styled.h3`
  font-size: 12px;
  color: #1e388b;
  font-weight: bold;
  margin-bottom: 10px;
`;

// 모집 제목 스타일
const TitleText = styled.p`
  font-size: 15px;
  color: #313131;
  font-weight: bold;
  margin: 5px 0;
`;

// 정보 섹션 스타일
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  font-weight: bold;
  color: #313131;
  margin: 5px 0;
`;

// 기업 소개 스타일
const Description = styled.p`
  width: 100%;
  height: 75px;
  background-color: #fbfbfb;
  font-size: 14px;
  color: #666;
  padding: 10px;
  box-sizing: border-box;
  margin: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  border-radius: 4px;
`;

// 모집 상태 및 버튼 섹션 스타일
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

// 상시 모집 상태 스타일
const Status = styled.p`
  font-size: 8px;
  color: #838383;
  font-weight: bold;
  margin: 0;
`;

// 엔트리 버튼 스타일
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc700;
  color: #1e388b;
  border: none;
  border-radius: 5px;
  width: 78px;
  height: 16px;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;

  &:hover {
    background-color: #e5b600;
  }

  img {
    margin-right: 5px;
  }
`;

const CompanyList = ({ companies }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/company/${id}`);
  };

  return (
    <ListWrapper>
      <Title>기업 리스트</Title>
      <Grid>
        {companies.map((company, index) => (
          <Card key={index} onClick={() => handleCardClick(index + 1)}>
            <Image src={company.imageSrc} alt={`${company.name} 이미지`} />
            <CardContent>
              <Name>{company.name}</Name>
              <TitleText>{company.title}</TitleText>
              <Info>
                <span>본사 소재지: {company.city}</span>
                <span>사원수: {company.numEmployees}</span>
              </Info>
              <Description>{company.introduction}</Description>
              <Footer>
                <Status>
                  {company.recruiting ? "상시모집 중" : "모집중지"}
                </Status>
                <Button>
                  <img src={EntryIcon} alt="Entry Icon" />
                  엔트리하기
                </Button>
              </Footer>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </ListWrapper>
  );
};

export default CompanyList;
