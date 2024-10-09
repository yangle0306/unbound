import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // AuthContext 추가
import styled from "styled-components";
import defaultImage from "../assets/picture.svg"; // 기본 이미지 (picture.svg)
import plusIcon from "../assets/plus.svg"; // plus.svg 추가
import backIcon from "../assets/back.svg"; // back.svg 추가
import registerIcon from "../assets/register.svg"; // register.svg 추가

// 이력서 등록 페이지 컨테이너 (중앙 배치)
const FormContainer = styled.div`
  max-width: 1260px;
  margin: 30px auto;
`;

const TwoColumnContainer = styled.div`
  display: flex;
  flex-direction: row; /* 옆으로 배치 */
  justify-content: center;
  gap: 20px; /* 두 단 사이의 간격 */
`;

const Section516Container = styled.div`
  width: 516px;
`;

const ImageAndFormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 10px;
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
`;

const FileName = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #313131;
`;

const FileInput = styled.input`
  display: none;
`;

const ProfileImageContainer = styled.div`
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

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: ${(props) => (props.$isDefault ? "10px" : "0")};
`;

const InputField = styled.input`
  width: 300px;
  height: 45px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  text-align: left;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
`;

const EducationField = styled.input`
  width: 516px;
  height: 45px;
  padding: 10px;
  margin-top: 9px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  text-align: left;
`;

const GenderContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const GenderButton = styled.button`
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

const CareerFieldsContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 516px;
  margin-top: 10px;
`;

const CareerField = styled.input`
  width: 122px;
  height: 45px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
`;

const LabelWithPlusContainer = styled.div`
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

const BackButton = styled.img`
  width: 516px;
  height: 53px;
  cursor: pointer;
  margin-top: 20px;
`;

const PositionSalaryContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 516px;
  margin-top: 10px;
`;

const PositionSalaryField = styled.input`
  width: 162px;
  height: 45px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  text-align: left;
`;

const MotivationTextarea = styled.textarea`
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

const RegisterButton = styled.img`
  width: 516px;
  height: 53px;
  margin-top: 20px;
  cursor: pointer;
`;

const Resume = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치를 기억
  const from = location.state?.from?.pathname || "/"; // 이전 경로, 없으면 기본값 '/'
  const { updateResumeExists } = useContext(AuthContext); // AuthContext에서 함수 가져오기
  const [fileName, setFileName] = useState("");
  const [profileImage, setProfileImage] = useState(defaultImage); // 기본 이미지로 설정
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState(""); // 성별 선택을 위한 상태
  const [education, setEducation] = useState(""); // 학력 입력을 위한 상태
  const [careers, setCareers] = useState([
    {
      period: "",
      company: "",
      position: "",
      jobDescription: "",
      careerTotal: "",
    },
  ]); // 경력 입력 필드 배열
  const [certifications, setCertifications] = useState([""]); // 자격증 입력을 위한 기본 3개 상태
  const [skills, setSkills] = useState(""); // 스킬 입력을 위한 상태
  const [etc, setEtc] = useState(""); // 기타 입력을 위한 상태
  const [address, setAddress] = useState(""); // 주소 입력 상태
  const [contact, setContact] = useState(""); // 연락처 입력 상태
  const [email, setEmail] = useState(""); // 이메일 입력 상태
  const [desiredPosition, setDesiredPosition] = useState(""); // 희망 포지션 입력 상태
  const [desiredLocation, setDesiredLocation] = useState(""); // 희망 근무지 입력 상태
  const [desiredSalary, setDesiredSalary] = useState(""); // 희망 연봉 입력 상태
  const [motivation, setMotivation] = useState(""); // 지망의 동기 입력 상태

  // 파일이 선택되면 파일 이름을 업데이트
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  // 프로필 사진이 선택되면 업데이트
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    } else {
      setProfileImage(defaultImage);
    }
  };

  // 성별 선택 핸들러
  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  // 경력 필드 추가
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

  // 자격증 필드 추가
  const addCertificationField = () => {
    setCertifications([...certifications, ""]);
  };

  // 자격증 필드 업데이트
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

  // 뒤로가기 버튼 핸들러
  const handleBack = () => {
    window.history.back(); // 뒤로가기 기능을 실행
  };

  // 등록 버튼 클릭 핸들러 (임시 데이터 저장)
  const handleRegister = () => {
    // 미리 채워진 임시 이력서 데이터
    const resumeData = {
      profileImage: defaultImage,
      name: "홍길동",
      birthdate: "1990-01-01",
      gender: "남",
      education: "서울대학교 컴퓨터공학과 졸업",
      careers: [
        {
          period: "2015-2020",
          company: "Google",
          position: "Software Engineer",
          jobDescription: "웹 애플리케이션 개발",
          careerTotal: "5년",
        },
        {
          period: "2020-현재",
          company: "Facebook",
          position: "Senior Software Engineer",
          jobDescription: "백엔드 아키텍처 설계 및 개발",
          careerTotal: "3년",
        },
      ],
      certifications: ["정보처리기사", "AWS Solutions Architect"],
      skills: "JavaScript, React, Node.js, AWS",
      etc: "개발 외에도 프로젝트 관리 경험이 있습니다.",
      address: "서울특별시 강남구 테헤란로",
      contact: "010-1234-5678",
      email: "hong@example.com",
      desiredPosition: "Technical Lead",
      desiredLocation: "서울",
      desiredSalary: "8000만원",
      motivation:
        "다양한 글로벌 프로젝트 경험을 바탕으로 팀을 이끌고, 기술적인 리더로 성장하고 싶습니다.",
    };

    // 이력서가 등록되었음을 표시 (resumeExists를 true로 변경하고 이력서 데이터 저장)
    updateResumeExists(resumeData);

    // 등록 버튼을 눌렀을 때 동작을 여기에 정의하세요
    alert("등록이 완료되었습니다!");

    navigate(from, { replace: true }); // 로그인 후 이전 경로로 이동
  };

  return (
    <FormContainer>
      <Title>이력서 등록</Title>
      <TwoColumnContainer>
        <Section516Container>
          <ImageAndFormContainer>
            <ProfileImageContainer onClick={triggerFileInput}>
              <ProfileImage
                src={profileImage}
                alt="프로필 사진"
                $isDefault={profileImage === defaultImage}
              />
            </ProfileImageContainer>
            <FileInput
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />

            <FormFields>
              <Label>이름</Label>
              <InputField
                type="text"
                placeholder="이름을 입력해 주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Label>생년월일</Label>
              <InputField
                type="text"
                placeholder="생년월일을 입력해 주세요"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />

              <Label>성별</Label>
              <GenderContainer>
                <GenderButton
                  selected={gender === "남"}
                  onClick={() => handleGenderChange("남")}
                >
                  남
                </GenderButton>
                <GenderButton
                  selected={gender === "여"}
                  onClick={() => handleGenderChange("여")}
                >
                  여
                </GenderButton>
              </GenderContainer>
            </FormFields>
          </ImageAndFormContainer>

          <SectionContainer>
            <Label>학력</Label>
            <EducationField
              type="text"
              placeholder="학력을 입력해 주세요"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </SectionContainer>

          <SectionContainer>
            <LabelWithPlusContainer>
              <Label>경력</Label>
              <PlusIcon src={plusIcon} alt="추가" onClick={addCareerFields} />
            </LabelWithPlusContainer>

            {careers.map((career, index) => (
              <div key={index}>
                <SectionContainer>
                  <CareerFieldsContainer>
                    <CareerField
                      type="text"
                      placeholder="기간"
                      value={career.period}
                      onChange={(e) =>
                        updateCareerField(index, "period", e.target.value)
                      }
                    />
                    <CareerField
                      type="text"
                      placeholder="기업명"
                      value={career.company}
                      onChange={(e) =>
                        updateCareerField(index, "company", e.target.value)
                      }
                    />
                    <CareerField
                      type="text"
                      placeholder="포지션"
                      value={career.position}
                      onChange={(e) =>
                        updateCareerField(index, "position", e.target.value)
                      }
                    />
                    <CareerField
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
                  </CareerFieldsContainer>
                  <EducationField
                    type="text"
                    placeholder="총 경력을 입력해 주세요"
                    value={career.careerTotal}
                    onChange={(e) =>
                      updateCareerField(index, "careerTotal", e.target.value)
                    }
                  />
                </SectionContainer>
              </div>
            ))}
          </SectionContainer>

          <SectionContainer>
            <LabelWithPlusContainer>
              <Label>자격증</Label>
              <PlusIcon
                src={plusIcon}
                alt="추가"
                onClick={addCertificationField}
              />
            </LabelWithPlusContainer>

            {certifications.map((certification, index) => (
              <EducationField
                key={index}
                type="text"
                placeholder="자격증을 입력해 주세요"
                value={certification}
                onChange={(e) =>
                  updateCertificationField(index, e.target.value)
                }
              />
            ))}
          </SectionContainer>

          <SectionContainer>
            <Label>스킬</Label>
            <EducationField
              type="text"
              placeholder="스킬을 입력해 주세요"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </SectionContainer>

          <SectionContainer>
            <Label>기타</Label>
            <EducationField
              type="text"
              placeholder="기타 내용을 입력해 주세요"
              value={etc}
              onChange={(e) => setEtc(e.target.value)}
            />
          </SectionContainer>
          <BackButton src={backIcon} alt="뒤로가기" onClick={handleBack} />
        </Section516Container>

        {/* 두 번째 516px 너비의 컨테이너에 주소, 연락처, 이메일 필드 추가 */}
        <Section516Container>
          <SectionContainer>
            <Label>주소</Label>
            <EducationField
              type="text"
              placeholder="주소를 입력해 주세요"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </SectionContainer>

          <SectionContainer>
            <Label>연락처</Label>
            <EducationField
              type="text"
              placeholder="연락처를 입력해 주세요"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </SectionContainer>

          <SectionContainer>
            <Label>이메일</Label>
            <EducationField
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </SectionContainer>

          {/* 희망 포지션 / 근무지 / 연봉 */}
          <SectionContainer>
            <Label>희망 포지션 / 근무지 / 연봉</Label>
            <PositionSalaryContainer>
              <PositionSalaryField
                type="text"
                placeholder="희망 포지션"
                value={desiredPosition}
                onChange={(e) => setDesiredPosition(e.target.value)}
              />
              <PositionSalaryField
                type="text"
                placeholder="희망 근무지"
                value={desiredLocation}
                onChange={(e) => setDesiredLocation(e.target.value)}
              />
              <PositionSalaryField
                type="text"
                placeholder="희망 연봉"
                value={desiredSalary}
                onChange={(e) => setDesiredSalary(e.target.value)}
              />
            </PositionSalaryContainer>
          </SectionContainer>

          {/* 지망의 동기, 특기, 매력포인트 추가 */}
          <SectionContainer>
            <Label>지망의 동기 / 특기 / 매력포인트</Label>
            <MotivationTextarea
              placeholder="지망의 동기, 특기 또는 매력포인트를 입력해 주세요"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
            />
          </SectionContainer>

          {/* 등록 버튼 추가 */}
          <RegisterButton
            src={registerIcon}
            alt="등록"
            onClick={handleRegister}
          />
        </Section516Container>
      </TwoColumnContainer>

      <FileInput id="file-upload" type="file" onChange={handleFileChange} />
      {fileName && <FileName>선택된 파일: {fileName}</FileName>}
    </FormContainer>
  );
};

export default Resume;
