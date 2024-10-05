import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// 최상위 컨테이너 스타일 (마진을 이용한 수평 중앙 정렬)
const DetailContainer = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: 40px auto 0 auto;
  text-align: center;
`;

// 둥근 직사각형 컨테이너 (680x403 크기, 마진 중앙 정렬)
const RoundedRectangle = styled.div`
  width: 680px;
  height: 403px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: space-between; /* 두 섹션을 수직으로 나눔 */
  padding: 20px;
`;

// 상단 섹션 (왼쪽 정보)
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 요소들을 수직으로 균등 배치 */
  align-items: flex-start;
  text-align: left;
`;

const TopSection = styled.div`
  width: 100%;
  text-align: left;
`;

// 회사명 스타일
const CompanyName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #313131; /* 텍스트 색상 */
`;

// 직무 스타일
const JobTitle = styled.p`
  font-size: 15px;
  color: #313131; /* 텍스트 색상 */
  margin-top: 10px;
`;

const BottomSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end; /* 요소를 하단에 배치 */
  align-items: center;
  background-color: #fbfbfb;
  font-size: 15px;
  color: #313131;
  padding: 10px;
  line-height: 1.4; /* 줄 간격 설정 */
  text-align: center;
  border-radius: 15px;
  width: 410px;
  height: 240px;
  display: flex; /* Flexbox를 사용 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  margin: 0 auto;
`;

// RightSection 수정
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center; /* 텍스트 가운데 정렬 */
`;

// 회사 로고 스타일
const CompanyLogo = styled.img`
  width: 82px;
  height: 82px;
  object-fit: cover;
  border-radius: 10%;
  margin: 0 auto; /* 추가적으로 너비 중앙 배치 */
`;

// 기업 정보 스타일 컨테이너 추가
const CompanyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1; /* 공간을 모두 차지하도록 설정 */
  margin-top: 5px;
`;

// 기업 정보 스타일
const CompanyInfo = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 10px;
`;

// 회사 정보 텍스트 스타일
const CompanyDetailText = styled.p`
  font-size: 15px; /* 텍스트 크기 설정 */
  color: #313131; /* 텍스트 색상 설정 */
  margin: 5px 0; /* 각 텍스트 요소의 위아래 마진 설정 */
  line-height: 1.4; /* 줄 간격 설정 */
`;

// 버튼 컨테이너 - 한 줄에 두 개의 버튼을 배치하기 위해 Flexbox 사용
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

// 기본 버튼 스타일
const InfoButton = styled.button`
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px; /* 텍스트 크기 12px */
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  text-align: center;
  padding: 0; /* 패딩 제거 */
`;

// 기업정보 버튼(77x21 크기)
const SmallButton = styled(InfoButton)`
  color: #ffffff;
  background-color: #1e388b;
  width: 77px;
  height: 21px;

  &:hover {
    background-color: #2851a3;
  }
`;

// 진행중인 채용보기 버튼(109x21 크기)
const LargeButton = styled(InfoButton)`
  color: #313131;
  background-color: #d9d9d9;
  width: 109px;
  height: 21px;
  &:hover {
    background-color: #b3b3b3;
  }
`;

const VerticalDivider = styled.div`
  width: 1px; /* 세로 구분선 */
  height: 100%;
  background-color: #e0e0e0;
  margin: 0;
`;

// 두 번째 둥근 직사각형 컨테이너 (680x276 크기)
const SmallRoundedRectangle = styled.div`
  width: 680px;
  height: 276px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  color: #1e388b; /* 텍스트 색상 */
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 20px;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  margin: 0;
`;

const DescriptionText = styled.p`
  font-size: 15px;
  color: #313131; /* 텍스트 색상 */
  line-height: 1.5;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능 */
`;

const ImageRoundedRectangle = styled.div`
  width: 680px;
  height: 200px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageItem = styled.div`
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

// 모달 스타일 수정
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8); /* 배경을 어둡게 처리 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 화면 위에 보이도록 설정 */
`;

// 이미지와 화살표가 함께 배치되는 컨테이너 추가
const ModalContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// 모달 이미지 스타일 수정
const ModalImage = styled.img`
  width: 676px;
  height: 692px;
  border-radius: 20px;
`;

// 좌우 버튼 스타일 수정 - 배경 제거
const ArrowButton = styled.button`
  background-color: transparent; /* 배경 제거 */
  border: none;
  padding: 10px;
  font-size: 48px; /* 화살표가 더 눈에 띄도록 폰트 크기를 약간 키움 */
  color: #ffffff; /* 하얀색 화살표 */
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1100;

  &:hover {
    background-color: rgba(
      255,
      255,
      255,
      0.3
    ); /* 살짝만 투명하게 hover 효과 추가 */
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: -50px; /* 이미지 왼쪽에 위치 */
`;

const RightArrow = styled(ArrowButton)`
  right: -50px; /* 이미지 오른쪽에 위치 */
`;

// 닫기 버튼 스타일 수정 - 배경 제거
const CloseButton = styled.button`
  background-color: transparent; /* 배경 제거 */
  border: none;
  padding: 10px;
  font-size: 24px; /* 화살표가 더 눈에 띄도록 폰트 크기를 약간 키움 */
  color: #ffffff; /* 하얀색 화살표 */
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  top: -50px; /* 이미지 상단에 붙이기 */
  right: 0px; /* 이미지 우측에 붙이기 */
  z-index: 1200;

  &:hover {
    background-color: rgba(
      255,
      255,
      255,
      0.3
    ); /* 살짝만 투명하게 hover 효과 추가 */
  }
`;

const CompanyDetail = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // 선택한 이미지 인덱스

  // 예시 데이터 - 실제로는 API 호출로 데이터를 가져올 수 있음
  const companyData = {
    1: {
      name: "Company A",
      jobTitle: "Software Engineer",
      location: "Seoul, South Korea",
      employeeCount: "500명",
      description:
        "회사 A는 테크 스타트업으로, 혁신적인 기술을 기반으로 다양한 프로젝트를 진행하고 있습니다.",
      images: [
        "https://via.placeholder.com/200", // 첫 번째 이미지
        "https://via.placeholder.com/200", // 두 번째 이미지
        "https://via.placeholder.com/200", // 세 번째 이미지
      ],
    },
    2: {
      name: "Company B",
      jobTitle: "Financial Analyst",
      location: "Busan, South Korea",
      employeeCount: "200명",
      description:
        "회사 B는 금융 서비스를 제공하며, 고객 맞춤형 솔루션을 제공합니다.",
      images: [
        "https://via.placeholder.com/200", // 첫 번째 이미지
        "https://via.placeholder.com/200", // 두 번째 이미지
        "https://via.placeholder.com/200", // 세 번째 이미지
      ],
    },
  };

  const company = companyData[id];

  if (!company) {
    return <div>Company not found</div>;
  }

  // 이미지 클릭 시 모달 열기
  const openModal = (index) => {
    setSelectedImageIndex(index); // 선택한 이미지 인덱스 설정
    setIsModalOpen(true); // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 다음 이미지로 넘기기
  const nextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % company.images.length
    );
  };

  // 이전 이미지로 넘기기
  const prevImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + company.images.length) % company.images.length
    );
  };

  return (
    <DetailContainer>
      <RoundedRectangle>
        <LeftSection>
          <TopSection>
            <CompanyName>회사명: {company.name}</CompanyName>
            <JobTitle>{company.jobTitle}</JobTitle>
          </TopSection>
          <Divider />
          <BottomSection>{company.description}</BottomSection>
        </LeftSection>

        <VerticalDivider />

        <RightSection>
          {/* 회사 로고 */}
          <CompanyLogo src="https://via.placeholder.com/82" alt="회사 로고" />

          {/* 기업 정보 컨테이너 */}
          <CompanyInfoContainer>
            <CompanyInfo>기업정보</CompanyInfo>
            <CompanyDetailText>{company.location}</CompanyDetailText>
            <CompanyDetailText>{company.employeeCount}</CompanyDetailText>
          </CompanyInfoContainer>

          {/* 버튼 컨테이너 */}
          <ButtonContainer>
            <SmallButton>기업정보</SmallButton>
            <LargeButton>진행중인 채용보기</LargeButton>
          </ButtonContainer>
        </RightSection>
      </RoundedRectangle>
      <SmallRoundedRectangle>
        <Title>기업소개</Title>
        <Divider />
        <DescriptionText>{company.description}</DescriptionText>
      </SmallRoundedRectangle>
      <ImageRoundedRectangle>
        {company.images.map((image, index) => (
          <ImageItem key={index} onClick={() => openModal(index)}>
            <img src={image} alt={`company-${index}`} />
          </ImageItem>
        ))}
      </ImageRoundedRectangle>

      {/* 모달이 열려 있을 때만 표시 */}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeModal}>✕</CloseButton>
            {/* 닫기 버튼 추가 */}
            <LeftArrow onClick={prevImage}>❮</LeftArrow>
            <ModalImage
              src={company.images[selectedImageIndex]}
              alt="확대된 이미지"
            />
            <RightArrow onClick={nextImage}>❯</RightArrow>
          </ModalContent>
        </Modal>
      )}
    </DetailContainer>
  );
};

export default CompanyDetail;
