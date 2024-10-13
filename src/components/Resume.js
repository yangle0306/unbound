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
  margin: 3px 0;
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
  margin-top: 18px;

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

  const API_URL = process.env.REACT_APP_API_URL;

  // **4개의 API GET 요청을 useEffect로 처리**
  useEffect(() => {
    // 사진 데이터를 불러오는 API 호출
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`${API_URL}/api/files?type=photo`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        const data = await response.json();
        const fileList = data.fileList;
        if (fileList[0] && fileList[0].url) {
          setPhotoFileId(fileList[0].url);
          setPhotoUrl(fileList[0].url);
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    // 이력서 데이터를 불러오는 API 호출
    const fetchResume = async () => {
      try {
        const response = await fetch(`${API_URL}/api/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        const data = await response.json();
        if (data) {
          setName(data.name || "");
          setBirth(data.birth || "");
          setSex(data.sex || "");
          setFinalEducation(data.finalEducation || "");
          setTotalCareerYear(data.totalCareerYear || "");
          setSkill(data.skill || "");
          setOthers(data.others || "");
          setAddress(data.address || "");
          setPhone(data.phone || "");
          setEmail(data.email || "");
          setDesiredPosition(data.desiredPosition || "");
          setDesiredWorkplace(data.desiredWorkplace || "");
          setDesiredSalary(data.desiredSalary || "");
          setDetails(data.details || "");
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    // 자격증 데이터를 불러오는 API 호출
    const fetchCertifications = async () => {
      try {
        const response = await fetch(`${API_URL}/api/me/qualified`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        const data = await response.json();
        const qualifiedList = data.qualifiedList;
        if (qualifiedList && qualifiedList.length > 0) {
          setDescription(qualifiedList.map((item) => item.description || ""));
        }
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    // 경력 데이터를 불러오는 API 호출
    const fetchCareers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/me/careers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        const data = await response.json();
        const careerList = data.careerList;
        if (careerList && careerList.length > 0) {
          setCareers(
            careerList.map((career) => ({
              period: career.period || "",
              companyName: career.companyName || "",
              position: career.position || "",
              jobDescription: career.jobDescription || "",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching careers:", error);
      }
    };

    // 데이터 fetching 함수 실행
    fetchPhoto();
    fetchResume();
    fetchCertifications();
    fetchCareers();
  }, [API_URL, user.accessToken]);

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
    // 필수 입력값만을 포함하고 선택 입력값은 trim()한 후 비어있지 않은 것만 포함
    const resumeData = {
      name: name.trim(),
      birth: birth.trim(),
      sex: sex.trim(),
      finalEducation: finalEducation.trim(),
      address: address.trim(),
      phone: phone.trim(),
      // 선택 입력값이 비어있지 않으면 포함
      ...(totalCareerYear.trim() && {
        totalCareerYear: totalCareerYear.trim(),
      }),
      ...(skill.trim() && { skill: skill.trim() }),
      ...(others.trim() && { others: others.trim() }),
      ...(desiredPosition.trim() && {
        desiredPosition: desiredPosition.trim(),
      }),
      ...(desiredWorkplace.trim() && {
        desiredWorkplace: desiredWorkplace.trim(),
      }),
      ...(desiredSalary.trim() && { desiredSalary: desiredSalary.trim() }),
      ...(details.trim() && { details: details.trim() }),
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
      // description 배열에서 공백만 있는 항목은 제외
      const filteredCertifications = description
        .map((cert) => cert.trim()) // 공백 제거
        .filter((cert) => cert); // 빈 값 또는 공백만 있는 항목 제외

      for (const certification of filteredCertifications) {
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
      const filteredCareers = careers.filter(
        (career) =>
          career.period.trim() ||
          career.companyName.trim() ||
          career.position.trim() ||
          career.jobDescription.trim()
      );

      for (const career of filteredCareers) {
        const response = await fetch(`${API_URL}/api/me/careers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            period: career.period.trim(),
            companyName: career.companyName.trim(),
            position: career.position.trim(),
            jobDescription: career.jobDescription.trim(),
          }),
        });

        const data = await response.json();
        console.log("Career submission response:", data); // 응답 데이터 출력
      }
    } catch (error) {
      console.error("Error submitting careers:", error);
    }
  };

  const validateFields = () => {
    // 경력 필드는 필수 입력 값이 아니므로 검사를 수행하지 않습니다.
    const careerErrors = careers.map((career) => ({
      period: false, // 필수 입력값 제거
      companyName: false, // 필수 입력값 제거
      position: false, // 필수 입력값 제거
      jobDescription: false, // 필수 입력값 제거
    }));

    // 자격증 필드는 필수 입력 값이 아니므로 검사를 수행하지 않습니다.
    const certificationErrors = description.map((cert) => false);

    // 필수 항목에 대해서만 유효성 검사를 수행합니다.
    const newErrors = {
      photo: photoFileId === defaultImage, // 필수
      name: !name.trim(), // 필수, 공백만 있는 경우도 걸림
      birth: !birth.trim(), // 필수, 공백만 있는 경우도 걸림
      sex: !sex.trim(), // 필수, 공백만 있는 경우도 걸림
      finalEducation: !finalEducation.trim(), // 필수, 공백만 있는 경우도 걸림
      totalCareerYear: false, // 필수 항목에서 제외
      address: !address.trim(), // 필수, 공백만 있는 경우도 걸림
      phone: !phone.trim(), // 필수, 공백만 있는 경우도 걸림
      email: !email.trim(), // 필수, 공백만 있는 경우도 걸림
      desiredPosition: false, // 필수 항목에서 제외
      desiredWorkplace: false, // 필수 항목에서 제외
      desiredSalary: false, // 필수 항목에서 제외
      details: false, // 필수 항목에서 제외
      careers: careerErrors, // 필수 항목에서 제외
      certifications: certificationErrors, // 필수 항목에서 제외
      skill: false, // 필수 항목에서 제외
      others: false, // 필수 항목에서 제외
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
      let photoPromise = Promise.resolve(); // 기본적으로 업로드하지 않음

      // photoFileId가 File 객체인 경우에만 업로드
      if (photoFileId instanceof File) {
        photoPromise = uploadPhoto(photoFileId);
      }

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
              />
              <PositionSalaryField
                type="text"
                placeholder="희망 근무지"
                value={desiredWorkplace}
                onChange={(e) => setDesiredWorkplace(e.target.value)}
              />
              <PositionSalaryField
                type="text"
                placeholder="희망 연봉"
                value={desiredSalary}
                onChange={(e) => setDesiredSalary(e.target.value)}
              />
            </PositionSalaryContainer>
          </SectionContainer>

          <SectionContainer>
            <Label>지망의 동기 / 특기 / 매력포인트</Label>
            <MotivationTextarea
              placeholder="지망의 동기, 특기 또는 매력포인트를 입력해 주세요"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </SectionContainer>
          <RegisterButton onClick={handleRegister}>등록하기</RegisterButton>
        </Section516Container>
      </TwoColumnContainer>
    </FormContainer>
  );
};

export default Resume;
