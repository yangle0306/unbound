import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 677px;
  height: 656px;
  padding: 20px;
  background-color: #ffffff; /* 하얀색 배경 */
  border-radius: 20px; /* 둥근 직사각형 모양 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 가벼운 그림자 */
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
  padding: 20px 30px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  text-align: left;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  color: #838383;
  margin: 20px 0;
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const AddURLPlus = styled.button`
  background-color: transparent;
  border: none;
  font-size: 36px;
  color: #dde2f1;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: #3f5ba9;
  }
`;

const InlineContainer = styled.div`
  width: 100%;
  height: 34px;
  display: flex;
  justify-content: center; /* 추가: 중앙 배치 */
  margin-bottom: 10px;
  gap: 10px;
`;

const Input = styled.input`
  width: 476px;
  height: 34px;
  padding: 10px;
  border-radius: 15px;
  border: 1px solid #ccc;
`;

const AddURLButton = styled.button`
  width: 109px;
  height: 34px;
  border-radius: 15px;
  border: 1px solid #ccc;
  background-color: ${(props) =>
    props.$completed ? "#1E388B" : "#ffffff"}; /* 등록 완료 시 색깔 변경 */
  color: ${(props) => (props.$completed ? "#fff" : "#838383")};
  cursor: pointer;
  font-size: 14px;
  text-align: center;

  &:hover {
    background-color: ${(props) =>
      props.$completed ? "#3f5ba9" : "#e9e9e9"}; /* 호버 색깔 변경 */
  }
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

// 버튼들을 나란히 배치하기 위한 컨테이너
const ButtonContainer = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
  margin-left: auto; /* 추가 */
  margin-right: auto; /* 추가 */
`;

const BackButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #f8f9ff;
  color: #313131;
  border: 1px solid #e0e0e0; /* 테두리 */
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #1e388b;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;

  &:hover {
    background-color: #3f5ba9;
  }
`;

function FileUrlRegister({ onClose }) {
  const [files, setFiles] = useState([]); // 파일을 배열로 관리
  const [urls, setUrls] = useState([""]); // URL 입력 필드를 배열로 관리
  const [completedUrls, setCompletedUrls] = useState([false]); // 각 URL의 등록 완료 상태를 배열로 관리

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // 여러 파일 선택
    if (selectedFiles.length + files.length > 5) {
      // 파일이 5개를 넘으면 에러 메시지
      alert("최대 5개 파일만 업로드 가능합니다.");
    } else {
      setFiles([...files, ...selectedFiles]); // 파일 추가
    }

    // 파일 선택 후, value 초기화
    e.target.value = "";
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      const fileNames = files.map((file) => `"${file.name}"`).join(", ");
      alert(`파일 ${fileNames}이(가) 성공적으로 등록되었습니다.`);
    } else {
      alert("파일을 선택해 주세요.");
    }
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleUrlSubmit = (index) => {
    const url = urls[index];
    if (url) {
      alert(`URL "${url}"이(가) 성공적으로 등록되었습니다.`);
      const newUrls = [...urls];
      newUrls[index] = ""; // 등록 후 입력창 초기화
      setUrls(newUrls);

      // 등록 완료 상태로 변경
      const newCompletedUrls = [...completedUrls];
      newCompletedUrls[index] = true;
      setCompletedUrls(newCompletedUrls);
    } else {
      alert("URL을 입력해 주세요.");
    }
  };

  const handleAddUrl = () => {
    if (urls.length < 3) {
      setUrls([...urls, ""]);
      setCompletedUrls([...completedUrls, false]); // 새 URL 필드 추가 시 완료 상태 초기화
    } else {
      alert("최대 3개의 URL만 추가할 수 있습니다.");
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
        <TitleContainer>
          <Title>URL 등록</Title>
          <AddURLPlus onClick={handleAddUrl}>+</AddURLPlus>
        </TitleContainer>

        {/* URL 입력 필드들 */}
        {urls.map((url, index) => (
          <InlineContainer key={index}>
            <Input
              type="text"
              placeholder="URL을 등록해 주세요"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
            />
            <AddURLButton
              onClick={() => handleUrlSubmit(index)}
              $completed={completedUrls[index]}
            >
              {completedUrls[index] ? "등록 완료" : "등록하기"}
            </AddURLButton>
          </InlineContainer>
        ))}
      </URLContainer>

      {/* 돌아가기와 등록하기 버튼을 같은 줄에 배치 */}
      <ButtonContainer>
        <BackButton onClick={onClose}>돌아가기</BackButton>
        <RegisterButton onClick={handleFileSubmit}>등록하기</RegisterButton>
      </ButtonContainer>
    </Container>
  );
}

export default FileUrlRegister;
