import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ImageSVG from "../assets/image.svg";

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
  justify-content: space-between; /* 위와 아래를 나눔 */
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
`;

const FixedMessages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 80px;
  margin-bottom: 20px;
`;

const SentMessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const SentMessage = styled.div`
  width: 356px;
  min-height: 64px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto; /* 메시지를 오른쪽으로 정렬 */
`;

const ReceivedMessage = styled.div`
  width: 356px;
  min-height: 64px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const MessageContentWrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
`;

const MessageText = styled.div`
  font-size: 15px;
  background-color: #3ab8ff;
  padding: 10px;
  border-radius: 15px;
`;

const ReceivedMessageText = styled.div`
  font-size: 15px;
  background-color: #e6e6e6;
  color: black;
  padding: 10px;
  border-radius: 15px;
`;

const SentTime = styled.div`
  font-size: 15px;
  color: #b4b4b4;
  margin-bottom: 5px;
`;

const ChatInputBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  border-top: 1px solid #d9d9d9;

  position: relative;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 10px 120px 10px 15px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const IconButton = styled.img`
  position: absolute;
  right: 85px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const SendButton = styled.button`
  position: absolute;
  width: 67px;
  height: 30px;
  right: 10px;
  background-color: #1e388b;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background-color: #163068;
  }
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

const PreviewWrapper = styled.div`
  position: absolute;
  bottom: 80px; /* 입력창 위에 고정되도록 설정 */
  left: 20px; /* 원하는 위치로 조정 가능 */
  z-index: 1000; /* 다른 요소들보다 앞에 위치 */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9e9e9; /* 배경색 추가 */
  padding: 20px; /* 미리보기와 배경 사이에 패딩 추가 */
  border-radius: 10px; /* 둥근 모서리 */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

const PreviewImage = styled.img`
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  margin-top: 10px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
`;

const DeleteButton = styled.button`
  margin-top: 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d9363e;
  }
`;

function Chat() {
  const [messages, setMessages] = useState([
    {
      type: "text",
      content:
        "해당 기업에 지원해줘서 감사합니다. 담당자가 확인 중이니 잠시만 기다려주세요!",
      from: "received",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기용 상태
  const chatBoxRef = useRef(null);
  const fileInputRef = useRef(null); // 파일 입력을 위한 ref 추가

  // 메시지가 추가될 때마다 스크롤을 하단으로 이동
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([
        ...messages,
        { type: "text", content: inputValue, from: "sent" },
      ]);
      setInputValue("");
    } else if (imagePreview) {
      // 이미지가 있을 때는 이미지 메시지를 전송
      setMessages([
        ...messages,
        { type: "image", content: imagePreview, from: "sent" },
      ]);
      setImagePreview(null); // 미리보기 상태 초기화
      fileInputRef.current.value = ""; // 파일 입력 필드 값 초기화
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl); // 미리보기 상태에 이미지 URL 저장
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null); // 이미지 미리보기 상태 초기화
    fileInputRef.current.value = ""; // 파일 입력 필드 값 초기화
  };

  const handleImageButtonClick = () => {
    fileInputRef.current.click(); // 파일 입력창 열기
  };

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
        <ChatBox ref={chatBoxRef}>
          <FixedMessages>
            <Logo src="https://via.placeholder.com/221x71" alt="Logo" />
            <GreetingText>
              안녕하세요. 언바운드입니다. 문의사항이 있으신가요?
            </GreetingText>
            <SupportDateText>
              2024년 8월 26일 15:57에 지원 했습니다.
            </SupportDateText>
          </FixedMessages>

          <SentMessagesContainer>
            {messages.map((message, index) =>
              message.from === "received" ? (
                <ReceivedMessage key={index}>
                  <MessageContentWrapper>
                    <SentTime>{new Date().toLocaleTimeString()}</SentTime>
                    {message.type === "image" ? (
                      <img
                        src={message.content}
                        alt="received-img"
                        style={{ width: "100%", borderRadius: "10px" }}
                      />
                    ) : (
                      <ReceivedMessageText>
                        {message.content}
                      </ReceivedMessageText>
                    )}
                  </MessageContentWrapper>
                </ReceivedMessage>
              ) : (
                <SentMessage key={index}>
                  <MessageContentWrapper>
                    <SentTime>{new Date().toLocaleTimeString()}</SentTime>
                    {message.type === "image" ? (
                      <img
                        src={message.content}
                        alt="sent-img"
                        style={{ width: "100%", borderRadius: "10px" }}
                      />
                    ) : (
                      <MessageText>{message.content}</MessageText>
                    )}
                  </MessageContentWrapper>
                </SentMessage>
              )
            )}
          </SentMessagesContainer>
        </ChatBox>

        <ChatInputBox>
          {/* 이미지 미리보기 */}
          {imagePreview && (
            <PreviewWrapper>
              <PreviewImage src={imagePreview} alt="미리보기 이미지" />
              <DeleteButton onClick={handleDeleteImage}>
                이미지 삭제
              </DeleteButton>
            </PreviewWrapper>
          )}
          <ChatInput
            placeholder="메시지를 입력하세요"
            value={inputValue}
            onChange={handleInputChange}
          />
          <IconButton
            src={ImageSVG}
            alt="Image Upload"
            onClick={handleImageButtonClick}
          />
          <SendButton onClick={handleSendMessage}>보내기</SendButton>
          {/* 파일 입력 필드 */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </ChatInputBox>
      </ChatContainer>
    </Container>
  );
}

export default Chat;
