import React, { useEffect, useRef, useState } from "react";
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

const AdminNewBanners = ({ onClose, bannerData }) => {
  const [imageUrl, setImageUrl] = useState(
    bannerData ? bannerData.imageUrl : ""
  );
  const [link, setLink] = useState(bannerData ? bannerData.link : "");
  const [startDate, setStartDate] = useState(
    bannerData ? bannerData.startDate : ""
  );
  const [endDate, setEndDate] = useState(bannerData ? bannerData.endDate : "");

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // 모달이 열리면 배너 데이터를 기본값으로 설정
  useEffect(() => {
    if (bannerData) {
      setImageUrl(bannerData.imageUrl);
      setLink(bannerData.link);
      setStartDate(bannerData.startDate);
      setEndDate(bannerData.endDate);
    }
  }, [bannerData]);

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

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      // 수정 모드인지 등록 모드인지 확인
      if (bannerData) {
        try {
          const requestData = {
            startAt: startDate,
            endAt: endDate,
            link: link,
          };

          // 수정 모드 (PUT 요청)
          const modifyResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/admin/banners/${bannerData.id}`, // PUT 요청에서 id 사용
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(requestData),
            }
          );

          if (!modifyResponse.ok) {
            alert("수정 실패");
            return;
          }

          alert("수정 성공");

          // 4. 성공 시 모달 닫기
          onClose();
          window.location.reload(); // 새로고침
        } catch (error) {
          console.error("Error:", error.message);
        }
      } else {
        try {
          // 1. 파일이 선택되었는지 확인
          if (!imageUrl) {
            alert("이미지를 넣어 주세요.");
            return;
          }

          // 2. 파일 업로드 요청
          const file = imageInputRef.current.files[0];
          const formData = new FormData();
          formData.append("file", file);

          const uploadResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/admin/banners/upload`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
              },
              body: formData,
            }
          );

          // 업로드 실패 시 에러 발생
          if (!uploadResponse.ok) {
            alert("파일 업로드 실패");
            return;
          }

          const uploadData = await uploadResponse.json();
          const fileId = uploadData.id; // 서버로부터 받은 fileId

          // 3. 배너 등록 요청
          const bannerData = {
            fileId: fileId, // 파일 업로드로 받은 fileId
            startAt: startDate, // 시작일
            endAt: endDate, // 종료일
            active: "Y", // 활성화 상태
            link: link, // 연결 링크
          };

          const bannerResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/admin/banners`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
              },
              body: JSON.stringify(bannerData),
            }
          );

          // 배너 등록 실패 시 에러 발생
          if (!bannerResponse.ok) {
            throw new Error("배너 등록 실패");
          }

          alert("배너 등록 성공");

          // 4. 성공 시 모달 닫기
          onClose();
          window.location.reload(); // 새로고침
        } catch (error) {
          console.error("Error:", error.message);
        }
      }
    }
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
      <ModalTitle>{bannerData ? "광고 수정" : "광고 등록"}</ModalTitle>

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
                {bannerData ? "이미지 수정 불가" : imageUrl ? "" : "사진 등록"}
              </ImagePreview>
              {!bannerData && (
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              )}
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
        <SubmitButton onClick={handleSave}>
          {bannerData ? "수정" : "등록"}
        </SubmitButton>
      </ButtonGroup>
    </ModalContainer>
  );
};

export default AdminNewBanners;
