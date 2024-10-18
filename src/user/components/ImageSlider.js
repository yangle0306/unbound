import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 1260px;
  margin: 40px auto;
`;

const Slider = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ImageWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => `translateX(-${props.$index * 100}%)`};
`;

const SlideImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;

  ${(props) => (props.$direction === "left" ? "left: 10px;" : "right: 10px;")}

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: ${(props) => (props.$active ? "#1E388B" : "#ccc")};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #1e388b;
  }
`;

const ImageSlider = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasBanners = banners && banners.length > 0;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === (hasBanners ? banners.length - 1 : 0) ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (hasBanners ? banners.length - 1 : 0) : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Wrapper>
      <Slider>
        <ImageWrapper $index={currentIndex}>
          {hasBanners ? (
            banners.map((banner, index) => (
              <SlideImage
                src={banner.imageSrc}
                alt={`Slide ${index}`}
                key={index}
              />
            ))
          ) : (
            <SlideImage
              src="https://via.placeholder.com/1260x300"
              alt="Default Image"
            />
          )}
        </ImageWrapper>
        {hasBanners && (
          <>
            <Arrow $direction="left" onClick={prevSlide}>
              &#10094;
            </Arrow>
            <Arrow $direction="right" onClick={nextSlide}>
              &#10095;
            </Arrow>
          </>
        )}
      </Slider>

      {hasBanners && (
        <Indicators>
          {banners.map((_, index) => (
            <Dot
              key={index}
              $active={currentIndex === index}
              onClick={() => goToSlide(index)}
            />
          ))}
        </Indicators>
      )}
    </Wrapper>
  );
};

export default ImageSlider;
