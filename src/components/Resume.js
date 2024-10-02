import React, { useState } from "react";
import styled from "styled-components";

// 이력서 등록 페이지 컨테이너
const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
`;

// 페이지 제목 스타일
const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 20px;
`;

// 파일 업로드 버튼 스타일
const UploadButton = styled.label`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #1e388b;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #3f5ba9;
  }
`;

// 파일 이름을 표시하는 텍스트 스타일
const FileName = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #313131;
`;

// 파일 선택 Input 스타일 (화면에 안 보이도록 숨김)
const FileInput = styled.input`
  display: none;
`;

const Resume = () => {
  const [fileName, setFileName] = useState("");

  // 파일이 선택되면 파일 이름을 업데이트
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <ResumeContainer>
      <Title>이력서 등록</Title>
      {/* 파일 업로드 버튼 */}
      <UploadButton htmlFor="file-upload">이력서 파일 업로드</UploadButton>
      <FileInput id="file-upload" type="file" onChange={handleFileChange} />
      {/* 선택한 파일 이름 표시 */}
      {fileName && <FileName>선택된 파일: {fileName}</FileName>}
    </ResumeContainer>
  );
};

export default Resume;
