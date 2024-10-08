import React from "react";
import styled from "styled-components";

// Container와 MessageContainer, ChatContainer는 기존 코드와 동일
const Container = styled.div`
  width: 1256px;
  height: auto;
  margin: 40px auto;
  display: flex;
  gap: 10px;
`;

const MessageContainer = styled.div`
  width: 413px;
  height: 826px;

  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 20px;
`;

const MessageTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 20px 10px 40px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  /* placeholder 색상 변경 */
  &::placeholder {
    color: #1e388b; /* 연한 회색 */
    opacity: 1; /* 크롬 등에서 opacity 필요할 수 있음 */
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  width: 15px; /* 아이콘 크기 조정 */
  height: 15px; /* 아이콘 크기 조정 */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%231E388B"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M9.5 17A7.5 7.5 0 109.5 2a7.5 7.5 0 000 15z" /></svg>');
  background-size: cover;

  /* 색상 변경 (여기서 #1E388B ) */
  background-color: transparent; /* 배경 투명화 */
`;

const MessageBox = styled.div`
  width: 100%;
  height: 450px;

  display: flex;
  flex-direction: column;

  overflow-y: auto;
  overflow-x: hidden;
`;

const MessageItem = styled.div`
  width: 100%;
  min-height: 102px; /* 최소 높이를 지정하여 스크롤 시 UI 안정성 보장 */
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 20px;
  margin-bottom: 10px; /* 메시지 간의 간격 추가 */

  display: flex;
`;

const CompanyLogo = styled.img`
  width: 55px; /* 로고 크기 */
  height: 55px; /* 로고 크기 */
  margin-right: 15px; /* 로고와 텍스트 사이 간격 */
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const CompanyDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 10px;
`;

const JobTitle = styled.div`
  font-size: 12px;
  color: #313131;
  margin-top: 5px;
`;

const ApplicationDate = styled.div`
  font-size: 12px;
  color: #313131;
  margin-top: 5px;
`;

const ChatContainer = styled.div`
  width: 834px;
  height: 826px;

  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChatBox = styled.div`
  width: 100%;
  height: 90%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  overflow-y: auto;
  overflow-x: hidden;
`;
const ChatInputBox = styled.div`
  width: 100%;
  height: 10%;

  display: flex;
`;

const Logo = styled.img`
  width: 228px; /* 로고 크기 */
  height: 71px; /* 로고 크기 */
  border-radius: 5px;
  border: 1px solid #000000;

  margin: 0 auto;
`;

const GreetingText = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

const SupportDateText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #888;
  text-align: center;
`;

function Chat() {
  return (
    <Container>
      <MessageContainer>
        <MessageTitle>메세지</MessageTitle>
        <SearchContainer>
          <SearchIcon />
          <SearchInput placeholder="기업 검색" />
        </SearchContainer>
        <MessageBox>
          <MessageItem>
            <CompanyLogo
              src="https://via.placeholder.com/50"
              alt="Company Logo"
            />
            <CompanyDetails>
              <CompanyName>업체명</CompanyName>
              <JobTitle>모집글</JobTitle>
              <ApplicationDate>지원일: 2024-10-01</ApplicationDate>
            </CompanyDetails>
          </MessageItem>
          <MessageItem>
            <CompanyLogo
              src="https://via.placeholder.com/50"
              alt="Company Logo"
            />
            <CompanyDetails>
              <CompanyName>업체명</CompanyName>
              <JobTitle>모집글</JobTitle>
              <ApplicationDate>지원일: 2024-10-01</ApplicationDate>
            </CompanyDetails>
          </MessageItem>
          <MessageItem>
            <CompanyLogo
              src="https://via.placeholder.com/50"
              alt="Company Logo"
            />
            <CompanyDetails>
              <CompanyName>업체명</CompanyName>
              <JobTitle>모집글</JobTitle>
              <ApplicationDate>지원일: 2024-10-01</ApplicationDate>
            </CompanyDetails>
          </MessageItem>
          <MessageItem>
            <CompanyLogo
              src="https://via.placeholder.com/50"
              alt="Company Logo"
            />
            <CompanyDetails>
              <CompanyName>업체명</CompanyName>
              <JobTitle>모집글</JobTitle>
              <ApplicationDate>지원일: 2024-10-01</ApplicationDate>
            </CompanyDetails>
          </MessageItem>
        </MessageBox>
      </MessageContainer>

      <ChatContainer>
        <ChatBox>
          <Logo src="https://via.placeholder.com/221x71" alt="Logo" />
          <GreetingText>
            안녕하세요. 언바운드입니다. 문의사항이 있으신가요?
          </GreetingText>
          <SupportDateText>
            2024년 8월 26일 15:57에 지원 했습니다.
          </SupportDateText>
        </ChatBox>
        <ChatInputBox />
      </ChatContainer>
    </Container>
  );
}

export default Chat;
