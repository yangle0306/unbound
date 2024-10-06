import React, { useState } from "react";
import styled from "styled-components";

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

const ModalContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ModalImage = styled.img`
  width: 676px;
  height: 692px;
  border-radius: 20px;
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 10px;
  font-size: 48px;
  color: #ffffff;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1100;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: -50px;
`;

const RightArrow = styled(ArrowButton)`
  right: -50px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 10px;
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  top: -50px;
  right: 0px;
  z-index: 1200;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const CompanyInfo = ({ company }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 이미지 클릭 시 모달 열기
  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 다음 이미지로 넘기기
  const nextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % company?.images?.length
    );
  };

  // 이전 이미지로 넘기기
  const prevImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + company?.images?.length) % company?.images?.length
    );
  };

  // company와 company.images가 정의되어 있지 않으면 렌더링하지 않음
  if (!company || !company.images) {
    return <div>Company information is not available</div>;
  }

  return (
    <>
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

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeModal}>✕</CloseButton>
            <LeftArrow onClick={prevImage}>❮</LeftArrow>
            <ModalImage
              src={company.images[selectedImageIndex]}
              alt="확대된 이미지"
            />
            <RightArrow onClick={nextImage}>❯</RightArrow>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CompanyInfo;
