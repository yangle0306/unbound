import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../context/UserContext"; // 로그인 상태 확인을 위한 useUser 훅
import defaultImage from "../assets/picture.svg";
import plusIcon from "../assets/plus.svg";

// 이력서 등록 페이지 컨테이너
const FormContainer = styled.div`
  max-width: 1260px;
  margin: 30px auto;
`;

const TwoColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
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
  border: 1px solid ${(props) => (props.$error ? "red" : "#b3b3b3")};
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
  border: 1px solid ${(props) => (props.$error ? "red" : "#ccc")};
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
  margin-top: 3px;
  border: 1px solid ${(props) => (props.$error ? "red" : "#ccc")};
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
  border: 1px solid ${(props) => (props.$error ? "red" : "#ccc")};
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
  border: 1px solid ${(props) => (props.$error ? "red" : "#ccc")};
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

const Highlight = styled.span`
  color: #ff574c;
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
  border: 1px solid ${(props) => (props.$error ? "red" : "#ccc")};
  border-radius: 5px;
  font-size: 16px;
  text-align: left;
`;

const MotivationTextarea = styled.textarea`
  width: 516px;
  height: 370px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.$error ? "red" : "#ccc")};
  border-radius: 5px;
  resize: none;
  overflow-y: scroll;
  margin-top: 10px;
`;

const RegisterButton = styled.button`
  width: 100%;
  height: 53px;
  background-color: #1e388b;
  border: 1px solid #d9d9d9;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  margin-top: 20px;

  &:hover {
    background-color: #3f5ba9;
  }
`;

const BackButton = styled.button`
  width: 100%;
  height: 53px;
  background-color: #f8f9ff;
  border: 1px solid #d9d9d9;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background-color: #b3b3b3;
  }
`;

const Resume = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [photoFileId, setPhotoFileId] = useState(defaultImage);
  const [photoUrl, setPhotoUrl] = useState(defaultImage);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [finalEducation, setFinalEducation] = useState("");
  const [totalCareerYear, setTotalCareerYear] = useState("");
  const [skill, setSkill] = useState("");
  const [others, setOthers] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [desiredPosition, setDesiredPosition] = useState("");
  const [desiredWorkplace, setDesiredWorkplace] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState([""]);
  const [careers, setCareers] = useState([
    {
      period: "",
      companyName: "",
      position: "",
      jobDescription: "",
    },
  ]);

  const [errors, setErrors] = useState({
    photo: false,
    name: false,
    birth: false,
    sex: false,
    finalEducation: false,
    totalCareerYear: false,
    address: false,
    phone: false,
    email: false,
    desiredPosition: false,
    desiredWorkplace: false,
    desiredSalary: false,
    details: false,
    careers: [
      {
        period: false,
        companyName: false,
        position: false,
        jobDescription: false,
      },
    ],
    certifications: [],
    skill: false,
    others: false,
  });

  // Handle photo URL management and cleanup
  useEffect(() => {
    let objectUrl;
    if (photoFileId instanceof File) {
      objectUrl = URL.createObjectURL(photoFileId);
      setPhotoUrl(objectUrl);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl); // 메모리 해제
    };
  }, [photoFileId]);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhotoFileId(file);
      setErrors({ ...errors, photo: false });
    } else {
      setPhotoFileId(null);
      setErrors({ ...errors, photo: true });
      alert("이미지 파일을 선택해 주세요.");
    }
  };

  const handleSexChange = (selectedSex) => {
    setSex(selectedSex);
    setErrors({ ...errors, sex: false });
  };

  const addCareerFields = () => {
    setCareers([
      ...careers,
      {
        period: "",
        companyName: "",
        position: "",
        jobDescription: "",
      },
    ]);
    setErrors({
      ...errors,
      careers: [
        ...errors.careers,
        {
          period: false,
          companyName: false,
          position: false,
          jobDescription: false,
        },
      ],
    });
  };

  const addCertificationField = () => {
    setDescription([...description, ""]);
    setErrors({
      ...errors,
      certifications: [...errors.certifications, false],
    });
  };

  const updateCertificationField = (index, value) => {
    const updatedDescription = [...description];
    updatedDescription[index] = value;
    setDescription(updatedDescription);

    const updatedErrors = [...errors.certifications];
    updatedErrors[index] = !value;
    setErrors({ ...errors, certifications: updatedErrors });
  };

  const updateCareerField = (index, field, value) => {
    const updatedCareers = [...careers];
    updatedCareers[index][field] = value;
    setCareers(updatedCareers);

    const updatedErrors = [...errors.careers];
    updatedErrors[index][field] = !value;
    setErrors({ ...errors, careers: updatedErrors });
  };

  const triggerFileInput = () => {
    document.getElementById("profile-upload").click();
  };

  const API_URL = process.env.REACT_APP_API_URL;

  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "photo");

    try {
      const response = await fetch(`${API_URL}/api/files/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Uploaded photo response:", data); // 응답 데이터 출력
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const submitResumeData = async () => {
    const resumeData = {
      name,
      birth,
      sex,
      finalEducation,
      totalCareerYear,
      skill,
      others,
      address,
      phone,
      desiredPosition,
      desiredWorkplace,
      desiredSalary,
      details,
      photoFileId: null,
    };

    try {
      const response = await fetch(`${API_URL}/api/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(resumeData),
      });

      const data = await response.json();
      console.log("Resume data submission response:", data); // 응답 데이터 출력
    } catch (error) {
      console.error("Error submitting resume:", error);
    }
  };

  const submitCertifications = async () => {
    try {
      for (const certification of description) {
        const response = await fetch(`${API_URL}/api/me/qualified`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ description: certification }),
        });

        const data = await response.json();
        console.log("Certification submission response:", data); // 응답 데이터 출력
      }
    } catch (error) {
      console.error("Error submitting certifications:", error);
    }
  };

  const submitCareers = async () => {
    try {
      for (const career of careers) {
        const response = await fetch(`${API_URL}/api/me/careers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(career),
        });

        const data = await response.json();
        console.log("Career submission response:", data); // 응답 데이터 출력
      }
    } catch (error) {
      console.error("Error submitting careers:", error);
    }
  };

  const validateFields = () => {
    const careerErrors = careers.map((career) => ({
      period: !career.period,
      companyName: !career.companyName,
      position: !career.position,
      jobDescription: !career.jobDescription,
    }));

    const certificationErrors = description.map((cert) => !cert);

    const newErrors = {
      photo: photoFileId === defaultImage,
      name: !name,
      birth: !birth,
      sex: !sex,
      finalEducation: !finalEducation,
      totalCareerYear: !totalCareerYear,
      address: !address,
      phone: !phone,
      email: !email,
      desiredPosition: !desiredPosition,
      desiredWorkplace: !desiredWorkplace,
      desiredSalary: !desiredSalary,
      details: !details,
      careers: careerErrors,
      certifications: certificationErrors,
      skill: !skill,
      others: !others,
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) =>
      Array.isArray(error)
        ? error.every(
            (e) => !e || Object.values(e).every((fieldError) => !fieldError)
          )
        : !error
    );
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleRegister = async () => {
    const isValid = validateFields();
    if (!isValid) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      const photoPromise =
        photoFileId && photoFileId !== defaultImage
          ? uploadPhoto(photoFileId)
          : Promise.resolve(); // 이미지를 업로드하지 않는 경우 기본 resolve

      const resumePromise = submitResumeData();
      const certificationsPromise = submitCertifications();
      const careersPromise = submitCareers();

      await Promise.all([
        photoPromise,
        resumePromise,
        certificationsPromise,
        careersPromise,
      ]);

      alert("등록이 완료되었습니다!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error during registration process:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <FormContainer>
      <Title>이력서 등록</Title>
      <TwoColumnContainer>
        <Section516Container>
          <ImageAndFormContainer>
            <ProfileImageContainer
              onClick={triggerFileInput}
              $error={errors.photo}
            >
              <ProfileImage
                src={photoFileId instanceof File ? photoUrl : photoFileId}
                alt="프로필 사진"
                $isDefault={photoFileId === defaultImage}
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
                $error={errors.name}
              />

              <Label>생년월일</Label>
              <InputField
                type="text"
                placeholder="생년월일을 입력해 주세요"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                $error={errors.birth}
              />

              <Label>성별</Label>
              <GenderContainer>
                <GenderButton
                  selected={sex === "M"}
                  onClick={() => handleSexChange("M")}
                  $error={errors.sex && sex === ""}
                >
                  남
                </GenderButton>
                <GenderButton
                  selected={sex === "F"}
                  onClick={() => handleSexChange("F")}
                  $error={errors.sex && sex === ""}
                >
                  여
                </GenderButton>
              </GenderContainer>
            </FormFields>
          </ImageAndFormContainer>

          <SectionContainer>
            <Label>
              학력<Highlight>(졸업년도 필요)</Highlight>
            </Label>
            <EducationField
              type="text"
              placeholder="학력을 입력해 주세요"
              value={finalEducation}
              onChange={(e) => setFinalEducation(e.target.value)}
              $error={errors.finalEducation}
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
                      $error={errors.careers[index]?.period}
                    />
                    <CareerField
                      type="text"
                      placeholder="기업명"
                      value={career.companyName}
                      onChange={(e) =>
                        updateCareerField(index, "companyName", e.target.value)
                      }
                      $error={errors.careers[index]?.companyName}
                    />
                    <CareerField
                      type="text"
                      placeholder="포지션"
                      value={career.position}
                      onChange={(e) =>
                        updateCareerField(index, "position", e.target.value)
                      }
                      $error={errors.careers[index]?.position}
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
                      $error={errors.careers[index]?.jobDescription}
                    />
                  </CareerFieldsContainer>
                </SectionContainer>
              </div>
            ))}

            <SectionContainer>
              <EducationField
                type="text"
                placeholder="총 경력을 입력해 주세요"
                value={totalCareerYear}
                onChange={(e) => setTotalCareerYear(e.target.value)}
                $error={errors.totalCareerYear}
              />
            </SectionContainer>
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

            {description.map((certification, index) => (
              <EducationField
                key={index}
                type="text"
                placeholder="자격증을 입력해 주세요"
                value={certification}
                onChange={(e) =>
                  updateCertificationField(index, e.target.value)
                }
                $error={errors.certifications[index]}
              />
            ))}
          </SectionContainer>

          <SectionContainer>
            <Label>스킬</Label>
            <EducationField
              type="text"
              placeholder="스킬을 입력해 주세요"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              $error={errors.skill}
            />
          </SectionContainer>

          <SectionContainer>
            <Label>기타</Label>
            <EducationField
              type="text"
              placeholder="기타 내용을 입력해 주세요"
              value={others}
              onChange={(e) => setOthers(e.target.value)}
              $error={errors.others}
            />
          </SectionContainer>
          <BackButton onClick={handleBack}>뒤로가기</BackButton>
        </Section516Container>

        <Section516Container>
          <SectionContainer>
            <Label>주소</Label>
            <EducationField
              type="text"
              placeholder="주소를 입력해 주세요"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              $error={errors.address}
            />
          </SectionContainer>

          <SectionContainer>
            <Label>연락처</Label>
            <EducationField
              type="text"
              placeholder="연락처를 입력해 주세요"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              $error={errors.phone}
            />
          </SectionContainer>

          <SectionContainer>
            <Label>이메일</Label>
            <EducationField
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              $error={errors.email}
            />
          </SectionContainer>

          <SectionContainer>
            <Label>희망 포지션 / 근무지 / 연봉</Label>
            <PositionSalaryContainer>
              <PositionSalaryField
                type="text"
                placeholder="희망 포지션"
                value={desiredPosition}
                onChange={(e) => setDesiredPosition(e.target.value)}
                $error={errors.desiredPosition}
              />
              <PositionSalaryField
                type="text"
                placeholder="희망 근무지"
                value={desiredWorkplace}
                onChange={(e) => setDesiredWorkplace(e.target.value)}
                $error={errors.desiredWorkplace}
              />
              <PositionSalaryField
                type="text"
                placeholder="희망 연봉"
                value={desiredSalary}
                onChange={(e) => setDesiredSalary(e.target.value)}
                $error={errors.desiredSalary}
              />
            </PositionSalaryContainer>
          </SectionContainer>

          <SectionContainer>
            <Label>지망의 동기 / 특기 / 매력포인트</Label>
            <MotivationTextarea
              placeholder="지망의 동기, 특기 또는 매력포인트를 입력해 주세요"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              $error={errors.details}
            />
          </SectionContainer>
          <RegisterButton onClick={handleRegister}>등록하기</RegisterButton>
        </Section516Container>
      </TwoColumnContainer>
    </FormContainer>
  );
};

export default Resume;
