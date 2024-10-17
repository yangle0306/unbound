import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import plusIcon from "../assets/plus.svg";
import { useLocation } from "react-router-dom";

// 스타일 정의
const Container = styled.div`
  width: 1180px;
  margin: 60px auto;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Header = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Label = styled.h2`
  font-size: 15px;
  font-weight: bold;
`;

const Select = styled.select`
  width: 114px;
  height: 34px;
  font-size: 16px;
  font-weight: 300;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #d8d7d7;
  cursor: pointer;
  color: #1e388b;
`;

const Option = styled.option`
  color: #1e388b;
`;

const FileSection = styled.div`
  width: 100%;
  margin: 10px 0;
`;

const FileItem = styled.p`
  font-size: 12px;
  margin-bottom: 10px;
`;

const ButtonWrap = styled.div`
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

const InfoSection = styled.div`
  width: 1180px;
  margin-top: 20px;
`;

const Content = styled.div`
  width: 1080px;
  margin: 0 auto;
`;

const TwoColumns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

const Column = styled.div`
  width: 516px;
`;

const ImageForm = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 10px;
`;

const ImgBox = styled.div`
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

const Img = styled.img`
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

const GenderWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const GenderBtn = styled.button`
  flex: 1;
  padding: 10px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.$selected ? "#1e388b" : "#fff")};
  color: ${(props) => (props.$selected ? "#fff" : "#000")};

  &:hover {
    background-color: #3f5ba9;
    color: white;
  }
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
`;

const InputWide = styled.input`
  width: 516px;
  height: 45px;
  padding: 10px;
  margin: 3px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Highlight = styled.span`
  color: #ff574c;
`;

const LabelPlus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PlusIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const CareerWrap = styled.div`
  display: flex;
  gap: 10px;
  width: 516px;
  margin-top: 10px;
`;

const CareerInput = styled.input`
  width: 122px;
  height: 45px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const SalaryWrap = styled.div`
  display: flex;
  gap: 15px;
  width: 516px;
  margin-top: 10px;
`;

const SalaryInput = styled.input`
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

const AdminMembersInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [member, setMember] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const [description, setDescription] = useState([
    { index: null, description: "-" },
  ]);

  const [careers, setCareers] = useState([
    {
      index: null,
      period: "-",
      companyName: "-",
      position: "-",
      jobDescription: "-",
    },
  ]);

  useEffect(() => {
    const memberData = location.state?.member || null;
    setMember(memberData);

    if (!memberData) {
      return;
    }

    // const fetchPhoto = async () => {
    //   try {
    //     const response = await fetch(
    //       `${process.env.REACT_APP_API_URL}/api/files?type=photo`,
    //       {
    //         method: "GET",
    //         headers: { Authorization: `Bearer ${memberData.id}` },
    //       }
    //     );
    //     const data = await response.json();
    //     if (data.fileList[0]?.url) {
    //       setPhotoUrl(data.fileList[0].url);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching photo:", error);
    //   }
    // };

    // const fetchCertifications = async () => {
    //   try {
    //     const response = await fetch(
    //       `${process.env.REACT_APP_API_URL}/api/me/qualified`,
    //       {
    //         method: "GET",
    //         headers: { Authorization: `Bearer ${memberData.id}` },
    //       }
    //     );
    //     const data = await response.json();
    //     if (data.qualifiedList && data.qualifiedList.length > 0) {
    //       setDescription(data.qualifiedList);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching certifications:", error);
    //   }
    // };

    // const fetchCareers = async () => {
    //   try {
    //     const response = await fetch(
    //       `${process.env.REACT_APP_API_URL}/api/me/careers`,
    //       {
    //         method: "GET",
    //         headers: { Authorization: `Bearer ${memberData.id}` },
    //       }
    //     );
    //     const data = await response.json();
    //     if (data.careerList && data.careerList.length > 0) {
    //       setCareers(data.careerList);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching careers:", error);
    //   }
    // };

    // fetchPhoto();
    // fetchCertifications();
    // fetchCareers();
  }, [location]);

  const [selectedMember, setSelectedMember] = useState("");

  const members = ["김철수", "이영희", "박민수", "홍길동"];

  const goBack = () => {
    navigate(-1);
  };

  const handleSelectChange = (e) => {
    setSelectedMember(e.target.value);
  };

  return (
    <Container>
      <Title>회원정보</Title>
      <Header>
        <Label>담당자</Label>
        <Select onChange={handleSelectChange} value={selectedMember}>
          <Option value="">선택</Option>
          {members.map((member, index) => (
            <Option key={index} value={member}>
              {member}
            </Option>
          ))}
        </Select>
      </Header>
      <InfoSection>
        <Content>
          <TwoColumns>
            <Column>
              <ImageForm>
                <ImgBox>
                  <Img src={null} alt="프로필 사진" />
                </ImgBox>

                <FormFields>
                  <Label>이름</Label>
                  <Input type="text" value={member?.name || ""} readOnly />

                  <Label>생년월일</Label>
                  <Input type="text" value={member?.birth || ""} readOnly />

                  <Label>성별</Label>
                  <GenderWrap>
                    <GenderBtn $selected={member?.sex === "M"}>남</GenderBtn>
                    <GenderBtn $selected={member?.sex === "F"}>여</GenderBtn>
                  </GenderWrap>
                </FormFields>
              </ImageForm>

              <Section>
                <Label>
                  학력<Highlight>(졸업년도 필요)</Highlight>
                </Label>
                <InputWide
                  type="text"
                  value={member?.finalEducation || ""}
                  readOnly
                />
              </Section>

              <Section>
                <LabelPlus>
                  <Label>경력</Label>
                  <PlusIcon src={plusIcon} alt="추가" />
                </LabelPlus>

                {careers.map((career, index) => (
                  <div key={index}>
                    <Section>
                      <CareerWrap>
                        <CareerInput
                          type="text"
                          value={career.period}
                          readOnly
                        />
                        <CareerInput
                          type="text"
                          value={career.companyName}
                          readOnly
                        />
                        <CareerInput
                          type="text"
                          value={career.position}
                          readOnly
                        />
                        <CareerInput
                          type="text"
                          value={career.jobDescription}
                          readOnly
                        />
                      </CareerWrap>
                    </Section>
                  </div>
                ))}

                <Section>
                  <InputWide
                    type="text"
                    value={member?.totalCareerYear || ""}
                    readOnly
                  />
                </Section>
              </Section>

              <Section>
                <LabelPlus>
                  <Label>자격증</Label>
                  <PlusIcon src={plusIcon} alt="추가" />
                </LabelPlus>

                {description.map((certification, index) => (
                  <InputWide
                    key={index}
                    type="text"
                    value={certification.description}
                    readOnly
                  />
                ))}
              </Section>

              <Section>
                <Label>스킬</Label>
                <InputWide type="text" value={member?.skill || "-"} readOnly />
              </Section>

              <Section>
                <Label>기타</Label>
                <InputWide type="text" value={member?.others || "-"} readOnly />
              </Section>
            </Column>

            <Column>
              <Section>
                <Label>주소</Label>
                <InputWide
                  type="text"
                  value={member?.address || "-"}
                  readOnly
                />
              </Section>

              <Section>
                <Label>연락처</Label>
                <InputWide type="text" value={member?.phone || "-"} readOnly />
              </Section>

              <Section>
                <Label>이메일</Label>
                <InputWide type="email" value={member?.email || "-"} readOnly />
              </Section>

              <Section>
                <Label>희망 포지션 / 근무지 / 연봉</Label>
                <SalaryWrap>
                  <SalaryInput
                    type="text"
                    value={member?.desiredPosition || "-"}
                    readOnly
                  />
                  <SalaryInput
                    type="text"
                    value={member?.desiredWorkplace || "-"}
                    readOnly
                  />
                  <SalaryInput
                    type="text"
                    value={member?.desiredSalary || "-"}
                    readOnly
                  />
                </SalaryWrap>
              </Section>

              <Section>
                <Label>지망의 동기 / 특기 / 매력포인트</Label>
                <TextArea value={member?.details || "-"} readOnly />
              </Section>
            </Column>
          </TwoColumns>

          <FileSection>
            <FileItem>등록된 파일 및 URL</FileItem>
            <FileItem>등록된 파일 및 URL</FileItem>
            <FileItem>등록된 파일 및 URL</FileItem>
          </FileSection>

          <ButtonWrap>
            <Button onClick={goBack}>돌아가기</Button>
          </ButtonWrap>
        </Content>
      </InfoSection>
    </Container>
  );
};

export default AdminMembersInfo;
