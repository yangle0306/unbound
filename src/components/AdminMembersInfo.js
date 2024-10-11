import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import defaultImage from "../assets/picture.svg";
import plusIcon from "../assets/plus.svg";

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

const InfoSection = styled.div`
  width: 1180px;
  margin-top: 20px;
`;

const ContentSection = styled.div`
  width: 1080px;
  margin: 0 auto;
`;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  width: 516px;
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

const FileDisplay = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #313131;
`;

const HiddenInput = styled.input`
  display: none;
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
  padding: ${(props) => (props.$isDefault ? "10px" : "0")};
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
  display: flex;
  flex-direction: column;
  width: 100%;
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
  background-color: ${(props) => (props.selected ? "#1e388b" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};

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

const AdminMembersInfo = () => {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState("");
  const [fileName, setFileName] = useState("");
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [careers, setCareers] = useState([
    {
      period: "",
      company: "",
      position: "",
      jobDescription: "",
      careerTotal: "",
    },
  ]);
  const [certifications, setCertifications] = useState([""]);
  const [skills, setSkills] = useState("");
  const [etc, setEtc] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [desiredPosition, setDesiredPosition] = useState("");
  const [desiredLocation, setDesiredLocation] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [motivation, setMotivation] = useState("");

  const members = ["김철수", "이영희", "박민수", "홍길동"];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    } else {
      setProfileImage(defaultImage);
    }
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const addCareerFields = () => {
    setCareers([
      ...careers,
      {
        period: "",
        company: "",
        position: "",
        jobDescription: "",
        careerTotal: "",
      },
    ]);
  };

  const addCertificationField = () => {
    setCertifications([...certifications, ""]);
  };

  const updateCertificationField = (index, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = value;
    setCertifications(updatedCertifications);
  };

  const updateCareerField = (index, field, value) => {
    const updatedCareers = [...careers];
    updatedCareers[index][field] = value;
    setCareers(updatedCareers);
  };

  const triggerFileInput = () => {
    document.getElementById("profile-upload").click();
  };

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
        <ContentSection>
          <Layout>
            <Column>
              <ProfileContainer>
                <ProfileImageBox onClick={triggerFileInput}>
                  <Image
                    src={profileImage}
                    alt="프로필 사진"
                    $isDefault={profileImage === defaultImage}
                  />
                </ProfileImageBox>
                <HiddenInput
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />

                <InputGroup>
                  <LabelText>이름</LabelText>
                  <Input
                    type="text"
                    placeholder="이름을 입력해 주세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <LabelText>생년월일</LabelText>
                  <Input
                    type="text"
                    placeholder="생년월일을 입력해 주세요"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />

                  <LabelText>성별</LabelText>
                  <ToggleGroup>
                    <ToggleButton
                      selected={gender === "남"}
                      onClick={() => handleGenderChange("남")}
                    >
                      남
                    </ToggleButton>
                    <ToggleButton
                      selected={gender === "여"}
                      onClick={() => handleGenderChange("여")}
                    >
                      여
                    </ToggleButton>
                  </ToggleGroup>
                </InputGroup>
              </ProfileContainer>

              <FieldGroup>
                <LabelText>학력</LabelText>
                <LargeInput
                  type="text"
                  placeholder="학력을 입력해 주세요"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </FieldGroup>

              <FieldGroup>
                <AddFieldGroup>
                  <LabelText>경력</LabelText>
                  <AddIcon
                    src={plusIcon}
                    alt="추가"
                    onClick={addCareerFields}
                  />
                </AddFieldGroup>

                {careers.map((career, index) => (
                  <div key={index}>
                    <FieldGroup>
                      <CareerInputGroup>
                        <SmallInput
                          type="text"
                          placeholder="기간"
                          value={career.period}
                          onChange={(e) =>
                            updateCareerField(index, "period", e.target.value)
                          }
                        />
                        <SmallInput
                          type="text"
                          placeholder="기업명"
                          value={career.company}
                          onChange={(e) =>
                            updateCareerField(index, "company", e.target.value)
                          }
                        />
                        <SmallInput
                          type="text"
                          placeholder="포지션"
                          value={career.position}
                          onChange={(e) =>
                            updateCareerField(index, "position", e.target.value)
                          }
                        />
                        <SmallInput
                          type="text"
                          placeholder="직무내용"
                          value={career.jobDescription}
                          onChange={(e) =>
                            updateCareerField(
                              index,
                              "jobDescription",
                              e.target.value
                            )
                          }
                        />
                      </CareerInputGroup>
                      <LargeInput
                        type="text"
                        placeholder="총 경력을 입력해 주세요"
                        value={career.careerTotal}
                        onChange={(e) =>
                          updateCareerField(
                            index,
                            "careerTotal",
                            e.target.value
                          )
                        }
                      />
                    </FieldGroup>
                  </div>
                ))}
              </FieldGroup>

              <FieldGroup>
                <AddFieldGroup>
                  <LabelText>자격증</LabelText>
                  <AddIcon
                    src={plusIcon}
                    alt="추가"
                    onClick={addCertificationField}
                  />
                </AddFieldGroup>

                {certifications.map((certification, index) => (
                  <LargeInput
                    key={index}
                    type="text"
                    placeholder="자격증을 입력해 주세요"
                    value={certification}
                    onChange={(e) =>
                      updateCertificationField(index, e.target.value)
                    }
                  />
                ))}
              </FieldGroup>

              <FieldGroup>
                <LabelText>스킬</LabelText>
                <LargeInput
                  type="text"
                  placeholder="스킬을 입력해 주세요"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </FieldGroup>

              <FieldGroup>
                <LabelText>기타</LabelText>
                <LargeInput
                  type="text"
                  placeholder="기타 내용을 입력해 주세요"
                  value={etc}
                  onChange={(e) => setEtc(e.target.value)}
                />
              </FieldGroup>
            </Column>

            {/* 두 번째 516px 너비의 컨테이너에 주소, 연락처, 이메일 필드 추가 */}
            <Column>
              <FieldGroup>
                <LabelText>주소</LabelText>
                <LargeInput
                  type="text"
                  placeholder="주소를 입력해 주세요"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FieldGroup>

              <FieldGroup>
                <LabelText>연락처</LabelText>
                <LargeInput
                  type="text"
                  placeholder="연락처를 입력해 주세요"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </FieldGroup>

              <FieldGroup>
                <LabelText>이메일</LabelText>
                <LargeInput
                  type="email"
                  placeholder="이메일을 입력해 주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FieldGroup>

              {/* 희망 포지션 / 근무지 / 연봉 */}
              <FieldGroup>
                <LabelText>희망 포지션 / 근무지 / 연봉</LabelText>
                <PositionFields>
                  <ShortField
                    type="text"
                    placeholder="희망 포지션"
                    value={desiredPosition}
                    onChange={(e) => setDesiredPosition(e.target.value)}
                  />
                  <ShortField
                    type="text"
                    placeholder="희망 근무지"
                    value={desiredLocation}
                    onChange={(e) => setDesiredLocation(e.target.value)}
                  />
                  <ShortField
                    type="text"
                    placeholder="희망 연봉"
                    value={desiredSalary}
                    onChange={(e) => setDesiredSalary(e.target.value)}
                  />
                </PositionFields>
              </FieldGroup>

              {/* 지망의 동기, 특기, 매력포인트 추가 */}
              <FieldGroup>
                <LabelText>지망의 동기 / 특기 / 매력포인트</LabelText>
                <TextArea
                  placeholder="지망의 동기, 특기 또는 매력포인트를 입력해 주세요"
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                />
              </FieldGroup>
            </Column>
          </Layout>

          <FileUrlSection>
            <FileUrlItem>등록된 파일 및 URL</FileUrlItem>
            <FileUrlItem>등록된 파일 및 URL</FileUrlItem>
            <FileUrlItem>등록된 파일 및 URL</FileUrlItem>
          </FileUrlSection>

          <ButtonWrapper>
            <Button onClick={goBack}>돌아가기</Button>
          </ButtonWrapper>
        </ContentSection>

        <HiddenInput id="file-upload" type="file" onChange={handleFileChange} />
        {fileName && <FileDisplay>선택된 파일: {fileName}</FileDisplay>}
      </InfoSection>
    </Container>
  );
};

export default AdminMembersInfo;
