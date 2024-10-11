import React from "react";
import styled from "styled-components";
import defaultImage from "../assets/picture.svg";
import plusIcon from "../assets/plus.svg";

// 스타일 정의
const ResumePreviewContainer = styled.div`
  width: 600px;
  height: auto;
  max-height: 700px;
  border-radius: 15px; /* 둥근 직사각형 */
  background-color: #ffffff; /* 배경색 */
  border: 1px solid #d9d9d9;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 가벼운 그림자 */
  overflow-y: auto; /* 높이 제한을 넘으면 스크롤 */
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #313131;
  text-align: center;
  margin-bottom: 20px;
`;

const InfoSection = styled.div`
  width: 100%;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Column = styled.div`
  width: 516px;
  margin: 0 auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileImageBox = styled.div`
  width: 191px;
  height: 245px;
  border-radius: 15px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #b3b3b3;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

const Input = styled.input`
  width: 300px;
  height: 45px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const FieldGroup = styled.div`
  margin-bottom: 10px;
`;

const LargeInput = styled.input`
  width: 516px;
  height: 45px;
  padding: 10px;
  margin-top: 9px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const ToggleGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 10px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fff;
  color: #000;

  &:hover {
    background-color: #3f5ba9;
    color: white;
  }
`;

const CareerInputGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 516px;
  margin-top: 10px;
`;

const SmallInput = styled.input`
  width: 122px;
  height: 45px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const LabelText = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const AddFieldGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AddIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const PositionFields = styled.div`
  display: flex;
  gap: 15px;
  width: 516px;
  margin-top: 10px;
`;

const ShortField = styled.input`
  width: 162px;
  height: 45px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 516px;
  height: 370px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  overflow-y: scroll;
  margin-top: 10px;
`;

const FileUrlSection = styled.div`
  width: 100%;
  margin: 10px 0;
`;

const FileUrlItem = styled.p`
  font-size: 12px;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 1080px;
  height: 53px;
  font-size: 24px;
  font-weight: bold;
  background-color: #f8f9ff;
  border: 1px solid #d9d9d9;
  color: black;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d0d4ff;
  }
`;

const ResumePreview = ({ onClose }) => {
  return (
    <ResumePreviewContainer>
      <Title>이력서</Title>
      <InfoSection>
        <Layout>
          <Column>
            <ProfileContainer>
              <ProfileImageBox>
                <Image src={defaultImage} alt="프로필 사진" />
              </ProfileImageBox>

              <InputGroup>
                <LabelText>이름</LabelText>
                <Input type="text" placeholder="이름을 입력해 주세요" />

                <LabelText>생년월일</LabelText>
                <Input type="text" placeholder="생년월일을 입력해 주세요" />

                <LabelText>성별</LabelText>
                <ToggleGroup>
                  <ToggleButton>남</ToggleButton>
                  <ToggleButton>여</ToggleButton>
                </ToggleGroup>
              </InputGroup>
            </ProfileContainer>

            <FieldGroup>
              <LabelText>학력</LabelText>
              <LargeInput type="text" placeholder="학력을 입력해 주세요" />
            </FieldGroup>

            <FieldGroup>
              <AddFieldGroup>
                <LabelText>경력</LabelText>
                <AddIcon src={plusIcon} alt="추가" />
              </AddFieldGroup>

              <FieldGroup>
                <CareerInputGroup>
                  <SmallInput type="text" placeholder="기간" />
                  <SmallInput type="text" placeholder="기업명" />
                  <SmallInput type="text" placeholder="포지션" />
                  <SmallInput type="text" placeholder="직무내용" />
                </CareerInputGroup>
                <LargeInput type="text" placeholder="총 경력을 입력해 주세요" />
              </FieldGroup>
            </FieldGroup>

            <FieldGroup>
              <AddFieldGroup>
                <LabelText>자격증</LabelText>
                <AddIcon src={plusIcon} alt="추가" />
              </AddFieldGroup>

              <LargeInput type="text" placeholder="자격증을 입력해 주세요" />
            </FieldGroup>

            <FieldGroup>
              <LabelText>스킬</LabelText>
              <LargeInput type="text" placeholder="스킬을 입력해 주세요" />
            </FieldGroup>

            <FieldGroup>
              <LabelText>기타</LabelText>
              <LargeInput type="text" placeholder="기타 내용을 입력해 주세요" />
            </FieldGroup>
          </Column>

          {/* 두 번째 516px 너비의 컨테이너에 주소, 연락처, 이메일 필드 추가 */}
          <Column>
            <FieldGroup>
              <LabelText>주소</LabelText>
              <LargeInput type="text" placeholder="주소를 입력해 주세요" />
            </FieldGroup>

            <FieldGroup>
              <LabelText>연락처</LabelText>
              <LargeInput type="text" placeholder="연락처를 입력해 주세요" />
            </FieldGroup>

            <FieldGroup>
              <LabelText>이메일</LabelText>
              <LargeInput type="email" placeholder="이메일을 입력해 주세요" />
            </FieldGroup>

            {/* 희망 포지션 / 근무지 / 연봉 */}
            <FieldGroup>
              <LabelText>희망 포지션 / 근무지 / 연봉</LabelText>
              <PositionFields>
                <ShortField type="text" placeholder="희망 포지션" />
                <ShortField type="text" placeholder="희망 근무지" />
                <ShortField type="text" placeholder="희망 연봉" />
              </PositionFields>
            </FieldGroup>

            {/* 지망의 동기, 특기, 매력포인트 추가 */}
            <FieldGroup>
              <LabelText>지망의 동기 / 특기 / 매력포인트</LabelText>
              <TextArea placeholder="지망의 동기, 특기 또는 매력포인트를 입력해 주세요" />
            </FieldGroup>
          </Column>
        </Layout>

        <FileUrlSection>
          <FileUrlItem>등록된 파일 및 URL</FileUrlItem>
          <FileUrlItem>등록된 파일 및 URL</FileUrlItem>
          <FileUrlItem>등록된 파일 및 URL</FileUrlItem>
        </FileUrlSection>

        <ButtonWrapper>
          <Button onClick={onClose}>돌아가기</Button>
        </ButtonWrapper>
      </InfoSection>
    </ResumePreviewContainer>
  );
};

export default ResumePreview;
