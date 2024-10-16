import React, { useRef, useState } from "react";
import styled from "styled-components";

// 모달 창 스타일
const ModalContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin: 20px 0;
`;

const FormTable = styled.div`
  display: table;
  width: 100%;
  margin-top: 40px;
  border-collapse: separate; /* 테두리 중복 방지 */
`;

const FormRow = styled.div`
  display: table-row;
`;

const FormLabel = styled.div`
  display: table-cell;
  width: 120px;
  padding: 10px;
  font-size: 15px;
  color: #313131;
  background-color: #f8f9ff;
  border: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9; /* input과의 사이에 테두리 유지 */
  border-bottom: none;
  vertical-align: middle;
`;

const FormInput = styled.div`
  display: table-cell;
  border: 1px solid #d9d9d9;
  border-left: none; /* 중복 방지 */
  border-bottom: none;
`;

const TextInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: none;
  font-size: 15px;

  &:focus {
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: #f8f9ff;
  border: 1px solid #d9d9d9;
  font-size: 15px;
  color: #1e1e1e;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0e4ff;
  }
`;

const SubmitButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: #1e388b;
  border: 1px solid #d9d9d9;
  font-size: 15px;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #152b69;
  }
`;

const DateFieldWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const DateField = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  appearance: none;
  pointer-events: none;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

const DateButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #1e388b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImageLabel = styled.div`
  display: table-cell;
  width: 120px;
  font-size: 15px;
  padding: 10px;
  color: #313131;
  background-color: #f8f9ff;
  vertical-align: middle;
  border: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9; /* input과 구분을 위한 테두리 */
`;

const ImagePreviewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #d9d9d9;
`;

const ImagePreview = styled.div`
  width: 180px;
  height: 50px;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #f8f9ff;
  background-image: ${(props) =>
    props.$imageUrl ? `url(${props.$imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
`;

const ImageDescription = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #b4b4b4;
  line-height: 1.2;
`;

const AdminNewBanners = ({ onClose }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleStartButtonClick = () => {
    if (startDateInputRef.current) {
      startDateInputRef.current.showPicker();
    }
  };

  const handleEndButtonClick = () => {
    if (endDateInputRef.current) {
      endDateInputRef.current.showPicker();
    }
  };

  const handleSave = () => {
    const formData = {
      link: link,
      startDate: startDate,
      endDate: endDate,
      imageUrl: imageUrl,
    };

    console.log(JSON.stringify(formData, null, 2));

    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreviewClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return (
    <ModalContainer>
      <ModalTitle>광고 등록</ModalTitle>

      <FormTable>
        <FormRow>
          <FormLabel>연결 링크</FormLabel>
          <FormInput>
            <TextInput
              type="text"
              placeholder="연결 링크를 입력하세요"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </FormInput>
        </FormRow>

        <FormRow>
          <FormLabel>시작일</FormLabel>
          <FormInput>
            <DateFieldWrapper>
              <DateField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                ref={startDateInputRef}
              />
              <DateButton onClick={handleStartButtonClick}>기간선택</DateButton>
            </DateFieldWrapper>
          </FormInput>
        </FormRow>

        <FormRow>
          <FormLabel>종료일</FormLabel>
          <FormInput>
            <DateFieldWrapper>
              <DateField
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                ref={endDateInputRef}
              />
              <DateButton onClick={handleEndButtonClick}>기간선택</DateButton>
            </DateFieldWrapper>
          </FormInput>
        </FormRow>

        <FormRow>
          <ImageLabel>광고 이미지</ImageLabel>
          <FormInput>
            <ImagePreviewWrapper>
              <ImagePreview $imageUrl={imageUrl} onClick={handlePreviewClick}>
                {!imageUrl && "사진 등록"}
              </ImagePreview>
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <ImageDescription>
                ※ 1260*300px 크기의 PNG, JPEG 포맷의 이미지 파일만 업로드
                가능합니다.
              </ImageDescription>
            </ImagePreviewWrapper>
          </FormInput>
        </FormRow>
      </FormTable>

      <ButtonGroup>
        <CancelButton onClick={onClose}>닫기</CancelButton>
        <SubmitButton onClick={handleSave}>등록</SubmitButton>
      </ButtonGroup>
    </ModalContainer>
  );
};

export default AdminNewBanners;
