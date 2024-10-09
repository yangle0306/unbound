import React, { useState } from "react";
import styled from "styled-components";
import ApplyPromptSVG from "../assets/applyprompt.svg";
import ApplyConfirmation from "./ApplyConfirmation";

// 350x586 크기의 둥근 직사각형 컨테이너
const RoundedContainer = styled.div`
  width: 350px;
  height: 586px;
  background-color: #ffffff;
  border-radius: 20px; /* 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px; /* 요소 간의 간격 */
`;

const ApplyPromptContainer = styled.div`
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

// 이미지 스타일
const Image = styled.img`
  width: 100%;
  height: 261px;
  object-fit: cover; /* 이미지를 컨테이너 크기에 맞춤 */
  border-radius: 10px; /* 이미지 모서리 둥글게 */
`;

// Content 그룹들 간의 간격 설정
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 30px; /* 그룹들 간의 간격 */
  margin: 20px 0;
  flex-grow: 1; /* 여유 공간을 모두 차지 */
`;

// Content 컨테이너 (텍스트 묶음 그룹)
const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; /* 각 요소 간의 간격 */
`;

// 모집 제목 텍스트 스타일
const JobTitleText = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #313131;
`;

// 메시지 텍스트 스타일
const MessageText = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #313131;
`;

// 설명 텍스트 스타일
const DescriptionText = styled.p`
  font-size: 11px;
  font-weight: 500;
  color: #838383;
`;

// 링크 텍스트 스타일
const LinkText = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: #1e388b;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #3f5ba9;
  }
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px; /* 버튼 간의 간격 */
`;

// 버튼 스타일
const Button = styled.button`
  width: 100%; /* 버튼이 전체 너비를 차지하게 설정 */
  height: 50px;
  background-color: ${(props) => (props.$primary ? "#F8F9FF" : "#1E388B")};
  color: ${(props) => (props.$primary ? "#313131" : "#ffffff")};
  border: 1px solid #e0e0e0; /* 테두리 */
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$primary ? "#b3b3b3" : "#3f5ba9")};
  }
`;

// ApplyPrompt 컴포넌트
const ApplyPrompt = ({ onApply, onCancel }) => {
  const [isSubmitted, setIsSubmitted] = useState(false); // 모달 상태 관리

  const handleApply = () => {
    onApply();
    setIsSubmitted(true); // "지원되었습니다" 모달로 전환
  };

  return (
    <>
      {isSubmitted ? (
        <ApplyConfirmation /> // "지원되었습니다" 모달 표시
      ) : (
        <RoundedContainer>
          <ApplyPromptContainer>
            {/* SVG 파일을 이미지로 삽입 */}
            <Image src={ApplyPromptSVG} alt="지원 이미지" />

            {/* Content 그룹으로 텍스트 묶기 */}
            <ContentContainer>
              {/* 모집 제목과 메시지 묶기 */}
              <ContentGroup>
                <JobTitleText>모집공고제목</JobTitleText>
                <MessageText>지원하시겠습니까?</MessageText>
              </ContentGroup>

              {/* 설명 텍스트와 이력서 수정 링크 묶기 */}
              <ContentGroup>
                <DescriptionText>
                  이력서가 전달됩니다. 마지막으로 이력서를 확인하세요.
                </DescriptionText>
                <LinkText href="/resume/edit">이력서 수정</LinkText>
              </ContentGroup>
            </ContentContainer>

            {/* 버튼 컨테이너 */}
            <ButtonContainer>
              <Button $primary onClick={onCancel}>
                아니오
              </Button>
              <Button onClick={handleApply}>지원</Button>
            </ButtonContainer>
          </ApplyPromptContainer>
        </RoundedContainer>
      )}
    </>
  );
};

export default ApplyPrompt;
