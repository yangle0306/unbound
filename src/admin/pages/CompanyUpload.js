import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CameraIcon from "../../assets/camera.svg";

// 스타일 정의
const Container = styled.div`
  width: 500px;
  margin: 60px auto;
  background-color: #fff;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 40px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RowContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 5px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InlineFormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-size: 15px;
  margin-bottom: 5px;
  color: #313131;
`;

const Input = styled.input`
  width: 286px;
  height: 45px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const SmallInput = styled.input`
  width: 204px;
  height: 31px;
  padding: 5px;
  font-size: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 286px;
  height: 45px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const FileInput = styled.input`
  display: none; /* 숨기기 */
`;

const ImagePreviewContainer = styled.div`
  width: 192px;
  height: 221px;
  border: 2px solid #d9d9d9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  margin-top: 10px;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // 이미지 비율 유지하면서 영역에 맞게 채우기
  border-radius: 20px; // ImagePreviewContainer에 맞게 둥글게 처리
`;

const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  gap: 20px;
`;

const DefaultImageWrapper = styled.img`
  width: 168px;
  height: 55px;
  object-fit: cover;
  border-radius: 10px;
`;

const PlaceholderContainer = styled.div`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
`;

const CameraIconWrapper = styled.img`
  margin-right: 10px;
  width: 20px; // 아이콘 크기 조정
  height: 20px;
`;

const PlaceholderText = styled.p`
  color: #b4b4b4;
  font-size: 13px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const CancelButton = styled.button`
  width: 246px;
  height: 53px;
  background-color: #f8f9ff;
  color: #313131;
  font-size: 24px;
  font-weight: bold;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const SubmitButton = styled.button`
  width: 246px;
  height: 53px;
  background-color: #1e388b;
  color: white;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #152b69;
  }
`;

const CustomSelectContainer = styled.div`
  position: relative;
  width: 204px;
  height: 31px;
`;

const CustomSelect = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  font-size: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

const CustomOptions = styled.div`
  position: absolute;
  top: 35px;
  width: 204px;
  height: 305px;
  padding: 20px 0;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const CustomOption = styled.div`
  padding: 10px;
  font-size: 14px;
  width: 202px;
  height: 67px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$bgColor === "#F8F9FF" ? "#F8F9FF" : "#FFFFFF"};

  &:hover {
    background-color: #e9e9e9;
  }
`;

const Arrow = styled.span`
  margin-left: 5px;
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: ${(props) => (props.open ? "rotate(-135deg)" : "rotate(45deg)")};
  transition: transform 0.2s ease;
`;

const OptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* 수직 중앙 정렬 */
  padding-bottom: 5px;
  border-bottom: 1px solid #d9d9d9;
`;
const OptionTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const OptionSubtitle = styled.p`
  font-size: 6px;
  color: #838383;
`;

const OptionDetails = styled.div`
  margin-top: 5px;
`;

const OptionLocationList = styled.p`
  font-size: 8px;
  color: #313131;
  margin: 0;
`;

const ImageUploadWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-left: 10px;
`;

const PlaceholderVerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 수직 중앙 정렬 */
  gap: 10px;
`;

const SmallImagePreviewContainer = styled.div`
  width: 135px;
  height: 66px;
  border-radius: 5px;
  border: 2px solid #d9d9d9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SmallImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Textarea = styled.textarea`
  width: 500px;
  height: 125px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 10px; // 둥근 직사각형
  resize: none; // 크기 조절 비활성화
  overflow-y: auto; // 세로 스크롤 가능하게 설정
  font-family: inherit; // 부모 요소의 폰트 사용
  line-height: 1.5;
`;

const CompanyUpload = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
  const [image, setImage] = useState(null); // 이미지 미리보기 상태
  const [selectedLocation, setSelectedLocation] = useState(""); // 선택된 본사 소재지
  const [isOpen, setIsOpen] = useState(false); // 옵션 드롭다운 상태
  const [companyImages, setCompanyImages] = useState([null, null, null]); // 기업 이미지 미리보기 상태 (최대 3개)

  const [companyName, setCompanyName] = useState(""); // 회사명
  const [employeeCount, setEmployeeCount] = useState(""); // 사원수
  const [companySummary, setCompanySummary] = useState(""); // 회사 소개 요약
  const [companyDescription, setCompanyDescription] = useState(""); // 회사 소개 본문

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      language: e.target.language.value,
      companyName,
      selectedLocation,
      employeeCount,
      companySummary,
      companyDescription,
      logo: image,
      companyImages: companyImages.filter((img) => img !== null), // 빈 이미지 제외
    };

    console.log(JSON.stringify(formData, null, 2));

    // 제출 후 다른 페이지로 이동
    navigate("/admin/companies");
  };

  const handleCancel = () => {
    // 취소 시 기업 리스트 페이지로 이동
    navigate("/admin/companies");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // 미리보기용 이미지 설정
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompanyImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyImages((prevImages) =>
          prevImages.map((img, i) => (i === index ? reader.result : img))
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click(); // 파일 선택 창 열기
  };

  const handleCompanyImageClick = (index) => {
    document.getElementById(`companyImageInput${index}`).click(); // 기업 이미지 파일 선택 창 열기
  };

  const handleSelectClick = () => {
    setIsOpen((prev) => !prev); // 드롭다운 열고 닫기
  };

  const handleOptionSelect = (location) => {
    setSelectedLocation(location);
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <Container>
      <Title>기업 등록</Title>
      <Form onSubmit={handleSubmit}>
        <RowContainer>
          <ColumnContainer>
            <FormGroup>
              <Label>언어구분</Label>
              <Select name="language">
                <option value="">한글 / 영어 / 일본어</option>
                <option value="한글">한글</option>
                <option value="영어">영어</option>
                <option value="일본어">일본어</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>회사명</Label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="회사명을 입력하세요"
              />
            </FormGroup>

            {/* 본사 소재지와 사원수 같은 줄에 배치 */}
            <InlineFormGroup>
              <Label>본사 소재지</Label>
              <CustomSelectContainer>
                <CustomSelect onClick={handleSelectClick}>
                  <span>{selectedLocation || "소재지를 선택하세요"}</span>
                  <Arrow open={isOpen} />
                </CustomSelect>
                {isOpen && (
                  <CustomOptions>
                    <CustomOption
                      $bgColor="#F8F9FF"
                      onClick={() => handleOptionSelect("북부 일본")}
                    >
                      <OptionHeader>
                        <OptionTitle>북부 일본</OptionTitle>
                        <OptionSubtitle>훗카이도 & 도호쿠</OptionSubtitle>
                      </OptionHeader>
                      <OptionDetails>
                        <OptionLocationList>
                          아오모리, 아키타, 이와테, 미야기, 야마가타, 후쿠시마
                        </OptionLocationList>
                      </OptionDetails>
                    </CustomOption>

                    <CustomOption
                      $bgColor="#FFFFFF"
                      onClick={() => handleOptionSelect("동부 일본")}
                    >
                      <OptionHeader>
                        <OptionTitle>동부 일본</OptionTitle>
                        <OptionSubtitle>간토 & 주부</OptionSubtitle>
                      </OptionHeader>
                      <OptionDetails>
                        <OptionLocationList>
                          도쿄, 가나가와, 사이타마, 치바, 이바라키, 군마,
                          도치기, 나가노, 야마나시, 시즈오카, 아이치, 니가타,
                          기후, 도야마, 이시카와, 후쿠이
                        </OptionLocationList>
                      </OptionDetails>
                    </CustomOption>

                    <CustomOption
                      $bgColor="#F8F9FF"
                      onClick={() => handleOptionSelect("서부 일본")}
                    >
                      <OptionHeader>
                        <OptionTitle>서부 일본</OptionTitle>
                        <OptionSubtitle>
                          간사이 & 주고쿠 & 시코쿠
                        </OptionSubtitle>
                      </OptionHeader>
                      <OptionDetails>
                        <OptionLocationList>
                          오사카, 교토, 효고, 시가, 나라, 와카야마, 미에,
                          오카야마, 히로시마, 야마구치, 시마네, 돗토리, 카가와,
                          에히메, 도쿠시마, 고치
                        </OptionLocationList>
                      </OptionDetails>
                    </CustomOption>

                    <CustomOption
                      $bgColor="#FFFFFF"
                      onClick={() => handleOptionSelect("남부 일본")}
                    >
                      <OptionHeader>
                        <OptionTitle>남부 일본</OptionTitle>
                        <OptionSubtitle>규슈 & 오키나와</OptionSubtitle>
                      </OptionHeader>
                      <OptionDetails>
                        <OptionLocationList>
                          후쿠오카, 사가, 나가사키, 구마모토, 오이타, 미야자키,
                          가고시마, 오키나와
                        </OptionLocationList>
                      </OptionDetails>
                    </CustomOption>
                  </CustomOptions>
                )}
              </CustomSelectContainer>
            </InlineFormGroup>

            <InlineFormGroup>
              <Label>사원수</Label>
              <SmallInput
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
                placeholder="사원수를 입력하세요"
              />
            </InlineFormGroup>
          </ColumnContainer>

          <ColumnContainer>
            <FormGroup>
              <Label>로고</Label>
              <ImagePreviewContainer onClick={handleImageClick}>
                {image ? (
                  <ImagePreview src={image} alt="미리보기 이미지" />
                ) : (
                  <DefaultContainer>
                    <DefaultImageWrapper
                      src="https://via.placeholder.com/200"
                      alt="디폴트 이미지"
                    />
                    <PlaceholderContainer>
                      <CameraIconWrapper src={CameraIcon} alt="Camera Icon" />
                      <PlaceholderText>로고를 등록해주세요</PlaceholderText>
                    </PlaceholderContainer>
                  </DefaultContainer>
                )}
              </ImagePreviewContainer>
              <FileInput
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormGroup>
          </ColumnContainer>
        </RowContainer>
        <RowContainer>
          <InlineFormGroup>
            <Label>기업이미지</Label>
            <ImageUploadWrapper>
              {companyImages.map((imgSrc, index) => (
                <SmallImagePreviewContainer
                  key={index}
                  onClick={() => handleCompanyImageClick(index)}
                >
                  {imgSrc ? (
                    <SmallImagePreview
                      src={imgSrc}
                      alt={`기업 이미지 ${index + 1}`}
                    />
                  ) : (
                    <PlaceholderVerticalContainer>
                      <CameraIconWrapper src={CameraIcon} alt="Camera Icon" />
                      <PlaceholderText>사진을 등록해주세요</PlaceholderText>
                    </PlaceholderVerticalContainer>
                  )}
                </SmallImagePreviewContainer>
              ))}
            </ImageUploadWrapper>
            {companyImages.map((_, index) => (
              <FileInput
                key={index}
                id={`companyImageInput${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleCompanyImageChange(e, index)}
              />
            ))}
          </InlineFormGroup>
        </RowContainer>
        <RowContainer>
          <TextareaContainer>
            <Label>기업 소개-요약</Label>
            <Textarea
              value={companySummary}
              onChange={(e) => setCompanySummary(e.target.value)}
              placeholder="기업 소개를 입력해 주세요"
            />
          </TextareaContainer>
        </RowContainer>
        <RowContainer>
          <TextareaContainer>
            <Label>기업 소개-본문</Label>
            <Textarea
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              placeholder="회사 소개를 입력해 주세요"
            />
          </TextareaContainer>
        </RowContainer>
        <ButtonGroup>
          <CancelButton type="button" onClick={handleCancel}>
            돌아가기
          </CancelButton>
          <SubmitButton type="submit">등록하기</SubmitButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default CompanyUpload;
