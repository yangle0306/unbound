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
  margin: 3px 0;
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

// 데이터 비교 함수 추가
const isDataChanged = (original, current) => {
  if (!original && !current) return false;
  if (original && !current) return true;
  if (!original && current) return true;

  if (typeof original === "object" && typeof current === "object") {
    const originalKeys = Object.keys(original);
    const currentKeys = Object.keys(current);
    if (originalKeys.length !== currentKeys.length) return true;

    for (let key of originalKeys) {
      if (original[key] !== current[key]) return true;
    }
    return false;
  }

  return original !== current;
};

const Resume = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // 원본 데이터 저장을 위한 상태 추가
  const [originalName, setOriginalName] = useState("");
  const [originalBirth, setOriginalBirth] = useState("");
  const [originalSex, setOriginalSex] = useState("");
  const [originalFinalEducation, setOriginalFinalEducation] = useState("");
  const [originalTotalCareerYear, setOriginalTotalCareerYear] = useState("");
  const [originalSkill, setOriginalSkill] = useState("");
  const [originalOthers, setOriginalOthers] = useState("");
  const [originalAddress, setOriginalAddress] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalDesiredPosition, setOriginalDesiredPosition] = useState("");
  const [originalDesiredWorkplace, setOriginalDesiredWorkplace] = useState("");
  const [originalDesiredSalary, setOriginalDesiredSalary] = useState("");
  const [originalDetails, setOriginalDetails] = useState("");
  const [originalDescription, setOriginalDescription] = useState([]);
  const [originalCareers, setOriginalCareers] = useState([]);

  const [photoFileId, setPhotoFileId] = useState(defaultImage);
  const [photoUrl, setPhotoUrl] = useState(defaultImage);
  const [existingPhotoId, setExistingPhotoId] = useState(""); // 서버에서 불러온 기존 이미지의 ID
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
  const [description, setDescription] = useState([
    { index: null, description: "" },
  ]);

  const [careers, setCareers] = useState([
    {
      index: null,
      period: "",
      companyName: "",
      position: "",
      jobDescription: "",
    },
  ]);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`${API_URL}/api/files?type=photo`, {
          method: "GET",
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        const data = await response.json();
        if (data.fileList[0]?.url) {
          setPhotoUrl(data.fileList[0].url);
          setPhotoFileId(data.fileList[0].id);
          setExistingPhotoId(data.fileList[0].id);
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    const fetchResume = async () => {
      try {
        const response = await fetch(`${API_URL}/api/me`, {
          method: "GET",
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        const data = await response.json();
        if (data) {
          setOriginalName(data.name);
          setOriginalBirth(data.birth);
          setOriginalSex(data.sex);
          setOriginalFinalEducation(data.finalEducation);
          setOriginalTotalCareerYear(data.totalCareerYear);
          setOriginalSkill(data.skill);
          setOriginalOthers(data.others);
          setOriginalAddress(data.address);
          setOriginalPhone(data.phone);
          setOriginalEmail(data.email);
          setOriginalDesiredPosition(data.desiredPosition);
          setOriginalDesiredWorkplace(data.desiredWorkplace);
          setOriginalDesiredSalary(data.desiredSalary);
          setOriginalDetails(data.details);

          // 현재 상태에도 설정
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

    const fetchCertifications = async () => {
      try {
        const response = await fetch(`${API_URL}/api/me/qualified`, {
          method: "GET",
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        const data = await response.json();
        if (data.qualifiedList && data.qualifiedList.length > 0) {
          setOriginalDescription(data.qualifiedList);
          setDescription(data.qualifiedList);
        }
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    const fetchCareers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/me/careers`, {
          method: "GET",
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        const data = await response.json();
        if (data.careerList && data.careerList.length > 0) {
          setOriginalCareers(data.careerList);
          setCareers(data.careerList);
        }
      } catch (error) {
        console.error("Error fetching careers:", error);
      }
    };

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
      setPhotoFileId(file); // 새로운 사진 파일 설정
      setPhotoUrl(URL.createObjectURL(file)); // 미리보기 URL 설정
    } else {
      setPhotoFileId(null);
      setPhotoUrl(defaultImage);
      alert("이미지 파일을 선택해 주세요.");
    }
  };

  const handleSexChange = (selectedSex) => {
    setSex(selectedSex);
  };

  const addCareerFields = () => {
    setCareers([
      ...careers,
      {
        index: null, // 새로 추가되는 경력 항목의 index는 null로 시작
        period: "",
        companyName: "",
        position: "",
        jobDescription: "",
      },
    ]);
  };

  const addCertificationField = () => {
    setDescription([
      ...description,
      {
        index: null, // 새로운 자격증 항목의 index는 null로 시작
        description: "", // 빈 description 필드 추가
      },
    ]);
  };

  const updateCertificationField = (index, value) => {
    const updatedDescription = [...description];

    // 객체의 description 속성을 업데이트
    updatedDescription[index] = {
      ...updatedDescription[index],
      description: value || "", // value가 undefined일 경우 빈 문자열로 처리
    };

    setDescription(updatedDescription);
  };

  const updateCareerField = (index, field, value) => {
    const updatedCareers = [...careers];

    // 특정 경력 객체의 필드를 업데이트
    updatedCareers[index] = {
      ...updatedCareers[index],
      [field]: value || "",
    };

    setCareers(updatedCareers);
  };

  const triggerFileInput = () => {
    document.getElementById("profile-upload").click();
  };

  // 사진 삭제 함수
  const deletePhoto = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/files`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ id }), // id를 body로 전송
      });
      console.log("Photo deleted successfully");
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  // 자격증 삭제 함수
  const deleteCertifications = async (index) => {
    try {
      const response = await fetch(`${API_URL}/api/me/qualified`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ index }), // index 값만 전송
      });
      console.log("Certification deleted successfully");
    } catch (error) {
      console.error("Error deleting certification:", error);
    }
  };

  const deleteCareers = async (index) => {
    try {
      const response = await fetch(`${API_URL}/api/me/careers`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index }), // index 값을 전송하여 삭제
      });
      console.log("Career deleted successfully");
    } catch (error) {
      console.error("Error deleting career:", error);
    }
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

  const handleBack = () => {
    window.history.back();
  };

  const isEmptyCareerField = (career) => {
    return (
      !career.period.trim() &&
      !career.companyName.trim() &&
      !career.position.trim() &&
      !career.jobDescription.trim()
    );
  };

  const isEmptyCertificationField = (cert) => {
    return !cert.description.trim();
  };

  const isIncompleteCareerField = (career) => {
    // 기간, 기업명, 포지션, 직무내용 중 하나라도 비어있으면 true
    return (
      !career.period.trim() ||
      !career.companyName.trim() ||
      !career.position.trim() ||
      !career.jobDescription.trim()
    );
  };

  const handleRegister = async () => {
    if (!sex) {
      alert("성별을 선택해주세요.");
      return;
    }

    if (photoFileId === defaultImage) {
      alert("사진을 업로드해주세요.");
      return;
    }

    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    try {
      let photoPromise = Promise.resolve();

      // 사진이 변경된 경우에만 삭제 및 업로드
      if (photoFileId instanceof File) {
        if (existingPhotoId) {
          await deletePhoto(existingPhotoId);
        }
        photoPromise = uploadPhoto(photoFileId);
      }

      // 자격증 처리
      for (let i = 0; i < description.length; i++) {
        const originalCert = originalDescription[i] || null;
        const currentCert = description[i];

        if (originalCert) {
          // 기존 자격증이 빈 값으로 변경된 경우 삭제
          if (isEmptyCertificationField(currentCert)) {
            await deleteCertifications(originalCert.index);
          } else if (isDataChanged(originalCert, currentCert)) {
            // 자격증이 변경된 경우 업데이트
            await fetch(`${API_URL}/api/me/qualified`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
              },
              body: JSON.stringify({
                description: currentCert.description.trim(),
              }),
            });
          }
        } else if (!isEmptyCertificationField(currentCert)) {
          // 새로 추가된 자격증이 빈 값이 아닌 경우에만 추가
          await fetch(`${API_URL}/api/me/qualified`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({
              description: currentCert.description.trim(),
            }),
          });
        }
      }

      // 경력 처리
      for (let i = 0; i < careers.length; i++) {
        const originalCareer = originalCareers[i] || null;
        const currentCareer = careers[i];

        if (originalCareer) {
          // 기존 경력이 빈 값으로 변경되었거나 필드 중 하나라도 비어 있는 경우 삭제
          if (
            isEmptyCareerField(currentCareer) ||
            isIncompleteCareerField(currentCareer)
          ) {
            await deleteCareers(originalCareer.index);
          } else if (isDataChanged(originalCareer, currentCareer)) {
            // 경력이 변경된 경우 업데이트
            await fetch(`${API_URL}/api/me/careers`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
              },
              body: JSON.stringify({
                period: currentCareer.period.trim(),
                companyName: currentCareer.companyName.trim(),
                position: currentCareer.position.trim(),
                jobDescription: currentCareer.jobDescription.trim(),
              }),
            });
          }
        } else if (!isIncompleteCareerField(currentCareer)) {
          // 새로 추가된 경력이 4개의 필드가 모두 채워져 있는 경우에만 추가
          await fetch(`${API_URL}/api/me/careers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({
              period: currentCareer.period.trim(),
              companyName: currentCareer.companyName.trim(),
              position: currentCareer.position.trim(),
              jobDescription: currentCareer.jobDescription.trim(),
            }),
          });
        }
      }

      // 이력서 데이터 처리
      const currentResumeData = {
        name: name.trim(),
        birth: birth.trim(),
        sex: sex.trim(),
        finalEducation: finalEducation.trim(),
        address: address.trim(),
        phone: phone.trim(),
        totalCareerYear: totalCareerYear.trim(),
        skill: skill.trim(),
        others: others.trim(),
        desiredPosition: desiredPosition.trim(),
        desiredWorkplace: desiredWorkplace.trim(),
        desiredSalary: desiredSalary.trim(),
        details: details.trim(),
      };

      const originalResumeData = {
        name: originalName,
        birth: originalBirth,
        sex: originalSex,
        finalEducation: originalFinalEducation,
        address: originalAddress,
        phone: originalPhone,
        totalCareerYear: originalTotalCareerYear,
        skill: originalSkill,
        others: originalOthers,
        desiredPosition: originalDesiredPosition,
        desiredWorkplace: originalDesiredWorkplace,
        desiredSalary: originalDesiredSalary,
        details: originalDetails,
      };

      if (isDataChanged(originalResumeData, currentResumeData)) {
        await fetch(`${API_URL}/api/me`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(currentResumeData),
        });
      }

      await Promise.all([photoPromise]);

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
            <ProfileImageContainer onClick={triggerFileInput}>
              <ProfileImage
                src={photoUrl}
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
              />

              <Label>생년월일</Label>
              <InputField
                type="text"
                placeholder="생년월일을 입력해 주세요"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />

              <Label>성별</Label>
              <GenderContainer>
                <GenderButton
                  selected={sex === "M"}
                  onClick={() => handleSexChange("M")}
                >
                  남
                </GenderButton>
                <GenderButton
                  selected={sex === "F"}
                  onClick={() => handleSexChange("F")}
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
                      value={career.period || ""}
                      onChange={(e) =>
                        updateCareerField(index, "period", e.target.value)
                      }
                    />
                    <CareerField
                      type="text"
                      placeholder="기업명"
                      value={career.companyName || ""}
                      onChange={(e) =>
                        updateCareerField(index, "companyName", e.target.value)
                      }
                    />
                    <CareerField
                      type="text"
                      placeholder="포지션"
                      value={career.position || ""}
                      onChange={(e) =>
                        updateCareerField(index, "position", e.target.value)
                      }
                    />
                    <CareerField
                      type="text"
                      placeholder="직무내용"
                      value={career.jobDescription || ""}
                      onChange={(e) =>
                        updateCareerField(
                          index,
                          "jobDescription",
                          e.target.value
                        )
                      }
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
                value={certification.description || ""}
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
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
          </SectionContainer>

          <SectionContainer>
            <Label>기타</Label>
            <EducationField
              type="text"
              placeholder="기타 내용을 입력해 주세요"
              value={others}
              onChange={(e) => setOthers(e.target.value)}
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
            />
          </SectionContainer>

          <SectionContainer>
            <Label>연락처</Label>
            <EducationField
              type="text"
              placeholder="연락처를 입력해 주세요"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
