import React, { useState } from "react";
import styled from "styled-components";

// 슬라이더 컨테이너 스타일
const SliderContainer = styled.div`
  width: 100%;
  max-width: 1260px; /* 최대 너비를 1260px로 제한 */
  overflow: hidden;
  position: relative;
  margin: 40px auto 0 auto; /* 상단에 20px 여백 추가, 가운데 정렬 */
  border-radius: 15px; /* 둥근 직사각형 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 약간의 그림자 효과 */
`;

// 이미지 리스트 스타일
const ImageList = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => `translateX(-${props.index * 100}%)`};
`;

// 이미지 스타일
const Image = styled.img`
  width: 1260px; /* 이미지 너비를 1260px로 설정 */
  height: 300px; /* 이미지 높이를 300px로 설정 */
  object-fit: cover;
`;

// 좌우 화살표 스타일
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;

  ${(props) => (props.direction === "left" ? "left: 10px;" : "right: 10px;")}

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

// 작은 점 (인디케이터) 스타일
const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* 점들 위에 10px의 여백 */
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "#1E388B" : "#ccc")};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #1e388b;
  }
`;

const images = [
  "https://via.placeholder.com/1260x300/ff7f7f/333333?text=Image+1",
  "https://via.placeholder.com/1260x300/7f7fff/333333?text=Image+2",
  "https://via.placeholder.com/1260x300/7fff7f/333333?text=Image+3",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 다음 이미지로 이동
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 이전 이미지로 이동
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // 특정 이미지로 이동 (작은 점 클릭)
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <SliderContainer>
        <ImageList index={currentIndex}>
          {images.map((image, index) => (
            <Image src={image} alt={`Slide ${index}`} key={index} />
          ))}
        </ImageList>
        <ArrowButton direction="left" onClick={prevSlide}>
          &#10094;
        </ArrowButton>
        <ArrowButton direction="right" onClick={nextSlide}>
          &#10095;
        </ArrowButton>
      </SliderContainer>

      {/* 작은 점(인디케이터) */}
      <DotsContainer>
        {images.map((_, index) => (
          <Dot
            key={index}
            active={currentIndex === index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotsContainer>
    </div>
  );
};

export default ImageSlider;
