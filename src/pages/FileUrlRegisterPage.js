import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 677px;
  height: auto;
  margin: 40px auto;
`;

const FileContainer = styled.div`
  width: 100%;
  height: 292px;
  margin-bottom: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const URLContainer = styled.div`
  width: 100%;
  height: 214px;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1e388b;
  text-align: left;
  margin-bottom: 10px;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  color: #838383;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  display: none; /* 기본 파일 입력을 숨김 */
`;

const Label = styled.label`
  width: 135px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;

  padding: 10px;
  background-color: #1e388b;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  text-align: center;

  &:hover {
    background-color: #3f5ba9;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #1e388b;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #3f5ba9;
  }
`;

const ResultMessage = styled.p`
  font-size: 14px;
  color: green;
  text-align: center;
  margin-top: 20px;
`;
const FileList = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px; /* 파일들 간의 간격을 추가 */
  flex-wrap: wrap; /* 파일들이 한 줄에 다 들어가지 않을 경우 다음 줄로 넘김 */
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0; /* 테두리 */
  border-radius: 15px;
  font-size: 14px;
  color: #333;
  max-width: 200px; /* 전체 파일 항목의 최대 너비 */
  white-space: nowrap; /* 텍스트가 한 줄로 나오게 */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileName = styled.span`
  flex-grow: 1; /* 파일 이름 영역이 가능한 한 많이 차지하도록 함 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RemoveButton = styled.div`
  flex-shrink: 0; /* 삭제 버튼은 크기가 줄어들지 않도록 설정 */
  width: 24px;
  height: 24px;
  background-color: #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 2px;
    background-color: white;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:hover {
    background-color: #e9e9e9;
  }
`;

function FileUrlRegisterPage() {
  const [files, setFiles] = useState([]); // 파일을 배열로 관리
  const [url, setUrl] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // 여러 파일 선택
    if (selectedFiles.length + files.length > 5) {
      // 파일이 5개를 넘으면 에러 메시지
      setResultMessage("최대 5개 파일만 업로드 가능합니다.");
    } else {
      setFiles([...files, ...selectedFiles]); // 파일 추가
      setResultMessage(""); // 에러 메시지 초기화
    }

    // 파일 선택 후, value 초기화
    e.target.value = "";
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      const fileNames = files.map((file) => `"${file.name}"`).join(", ");
      setResultMessage(`파일 ${fileNames}이(가) 성공적으로 등록되었습니다.`);
    } else {
      setResultMessage("파일을 선택해 주세요.");
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (url) {
      setResultMessage(`URL "${url}"이(가) 성공적으로 등록되었습니다.`);
    } else {
      setResultMessage("URL을 입력해 주세요.");
    }
  };

  const handleFileRemove = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove)); // 파일 삭제
  };

  return (
    <Container>
      {/* File 등록 컨테이너 */}
      <FileContainer>
        <Title>파일 등록</Title>
        <DescriptionText>
          500MB 이하의 jpg, png, pdf, gif 파일 5개까지 업로드 가능합니다.
        </DescriptionText>
        <form onSubmit={handleFileSubmit}>
          <Label htmlFor="file">파일 선택</Label>
          <FileInput
            type="file"
            id="file"
            onChange={handleFileChange}
            multiple // 여러 파일 선택 가능
          />
        </form>

        {/* 업로드한 파일 목록 */}
        {files.length > 0 && (
          <FileList>
            {files.map((file, index) => (
              <FileItem key={index}>
                <FileName>{file.name}</FileName>
                <RemoveButton onClick={() => handleFileRemove(index)} />
              </FileItem>
            ))}
          </FileList>
        )}
      </FileContainer>

      {/* URL 등록 컨테이너 */}
      <URLContainer>
        <Title>URL 등록</Title>
        <form onSubmit={handleUrlSubmit}>
          <Input
            type="url"
            id="url"
            placeholder="등록할 URL을 입력하세요"
            value={url}
            onChange={handleUrlChange}
          />
          <Button type="submit">URL 등록</Button>
        </form>
      </URLContainer>

      {/* 파일 등록 버튼을 URL 등록 컨테이너 밑에 이동 */}
      <Button onClick={handleFileSubmit}>파일 등록</Button>

      {/* 결과 메시지 */}
      {resultMessage && <ResultMessage>{resultMessage}</ResultMessage>}
    </Container>
  );
}

export default FileUrlRegisterPage;
