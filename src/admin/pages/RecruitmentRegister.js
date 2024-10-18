import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

// 스타일 정의
const Container = styled.div`
  width: 1253px;
  margin: 60px auto;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #313131;
  text-align: center;
  margin-bottom: 20px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between; /* 요소들을 좌우로 배치 */
  margin-bottom: 20px; /* 행 사이 간격 */
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; /* 요소들을 좌우로 배치 */
  gap: 10px;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 585px; /* ColumnContainer의 너비를 585px로 설정 */
`;

const Column = styled.div`
  width: 100%; /* Column 내부 요소들이 ColumnContainer의 너비에 맞도록 설정 */
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  color: #313131;
  margin-bottom: 10px;
`;

const Input = styled.input`
  height: 45px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  width: 246px;
  height: 53px;
  padding: 5px;
  font-size: 24px;
  font-weight: bold;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  background-color: #1e388b;

  color: white;

  &:hover {
    background-color: #162d6d;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f8f9ff;

  color: #313131;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  margin-bottom: 20px;
  width: 100%;
  height: 118px; /* 기본 높이 설정 */
`;

const LargeTextArea = styled(TextArea)`
  height: 306px; /* 특정 textarea 높이 확장 */
`;

const EqualButtonRow = styled(Row)`
  gap: 10px; /* 요소 간의 간격 */
  margin-bottom: 10px;
`;

const EqualButton = styled.button`
  flex: 1; /* 버튼을 균등하게 만들기 위해 flex 사용 */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background-color: ${({ selected }) => (selected ? "#1e388b" : "#ffffff")};
  color: ${({ selected }) => (selected ? "#ffffff" : "#313131")};
  cursor: pointer;
  text-align: center;
`;

const Select = styled.select`
  height: 45px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #ffffff;
  color: #313131;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #1e388b;
  }
`;

// AdminRecruitmentRegister 컴포넌트
const RecruitmentRegister = () => {
  const { companyId } = useParams(); // URL에서 companyId 가져오기
  const navigate = useNavigate();

  // 모집 공고 입력 상태 관리

  // 폼 입력 상태 관리
  const [title, setTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobAppeal, setJobAppeal] = useState("");
  const [salary, setSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [process, setProcess] = useState("");
  const [benefits, setBenefits] = useState("");
  const [holiday, setHoliday] = useState("");
  const [smokingArea, setSmokingArea] = useState(null);
  const [recruitmentPeriod, setRecruitmentPeriod] = useState(null);
  const [japaneseLevel, setJapaneseLevel] = useState(null);
  const [englishLevel, setEnglishLevel] = useState(null);
  const [language, setLanguage] = useState(""); // 언어 구분 상태 관리
  const [position, setPosition] = useState("");
  const [workEnvironment, setWorkEnvironment] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [experience, setExperience] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [preferredConditions, setPreferredConditions] = useState("");
  const [idealCandidate, setIdealCandidate] = useState("");

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 흡연실 유무가 선택되지 않은 경우
    if (!smokingArea) {
      alert("흡연실 유무를 선택해 주세요.");
      return; // 폼 제출을 중단
    }

    if (!recruitmentPeriod) {
      alert("모집 기간을 선택해 주세요.");
      return; // 폼 제출을 중단
    }

    if (!japaneseLevel) {
      alert("필요일본어 수준을 선택해 주세요.");
      return; // 폼 제출을 중단
    }

    if (!englishLevel) {
      alert("필요영어 수준을 선택해 주세요.");
      return; // 폼 제출을 중단
    }

    // 입력된 데이터 객체 생성
    const recruitmentData = {
      title,
      jobDescription,
      jobAppeal,
      salary,
      bonus,
      process,
      benefits,
      holiday,
      smokingArea,
      recruitmentPeriod,
      japaneseLevel,
      englishLevel,
      position,
      workEnvironment,
      employmentType,
      workPlace,
      workTime,
      experience,
      requiredSkills,
      preferredConditions,
      idealCandidate,
    };

    // JSON 형식으로 출력
    console.log(JSON.stringify(recruitmentData, null, 2));

    // 등록 후 기업 리스트 페이지로 이동
    navigate("/admin/companies");
  };

  // 돌아가기 버튼 클릭 핸들러
  const handleBackClick = () => {
    navigate("/admin/companies"); // 돌아가기 버튼 클릭 시 기업 리스트로 이동
  };

  return (
    <Container>
      <Title>모집 등록</Title>
      <Form onSubmit={handleSubmit}>
        {/* 좌측 폼 영역 */}
        <RowContainer>
          <ColumnContainer>
            <Row>
              <Column>
                <Label>모집 제목</Label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="모집 제목을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>직무내용</Label>
                <LargeTextArea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="업무내용을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>구인의 매력</Label>
                <LargeTextArea
                  value={jobAppeal}
                  onChange={(e) => setJobAppeal(e.target.value)}
                  placeholder="구인의 매력을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>급여</Label>
                <TextArea
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="연봉을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>상여</Label>
                <TextArea
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  placeholder="상여을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>전형과정</Label>
                <TextArea
                  value={process}
                  onChange={(e) => setProcess(e.target.value)}
                  placeholder="전형과정을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>복리후생</Label>
                <TextArea
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="복리후생을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>휴일·휴가</Label>
                <TextArea
                  value={holiday}
                  onChange={(e) => setHoliday(e.target.value)}
                  placeholder="휴일·휴가를 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>흡연실 유무</Label>
                <EqualButtonRow>
                  <EqualButton
                    type="button"
                    selected={smokingArea === "유"}
                    onClick={() => setSmokingArea("유")}
                  >
                    유
                  </EqualButton>
                  <EqualButton
                    type="button"
                    selected={smokingArea === "무"}
                    onClick={() => setSmokingArea("무")}
                  >
                    무
                  </EqualButton>
                </EqualButtonRow>
              </Column>
            </Row>
          </ColumnContainer>

          {/* 우측 폼 영역 */}
          <ColumnContainer>
            <Row>
              <Column>
                <Label>언어 구분</Label>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                >
                  <option value="">언어를 입력하세요</option>
                  <option value="ko">한국어</option>
                  <option value="en">영어</option>
                  <option value="jp">일본어</option>
                </Select>
              </Column>
              <Column>
                <Label>모집 기간</Label>
                <EqualButtonRow>
                  <EqualButton
                    type="button"
                    selected={recruitmentPeriod === "상시채용"}
                    onClick={() => setRecruitmentPeriod("상시채용")}
                  >
                    상시채용
                  </EqualButton>
                  <EqualButton
                    type="button"
                    selected={recruitmentPeriod === "모집완료시 까지"}
                    onClick={() => setRecruitmentPeriod("모집완료시 까지")}
                  >
                    모집완료시 까지
                  </EqualButton>
                </EqualButtonRow>
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>포지션</Label>
                <Input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="포지션을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>개발환경</Label>
                <LargeTextArea
                  value={workEnvironment}
                  onChange={(e) => setWorkEnvironment(e.target.value)}
                  placeholder="개발환경을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>고용형태</Label>
                <Input
                  type="text"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  placeholder="고용형태를 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>근무지</Label>
                <TextArea
                  value={workPlace}
                  onChange={(e) => setWorkPlace(e.target.value)}
                  placeholder="근무지를 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>근무시간</Label>
                <TextArea
                  value={workTime}
                  onChange={(e) => setWorkTime(e.target.value)}
                  placeholder="근무시간을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>경력</Label>
                <TextArea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="경력을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>필요일본어 수준</Label>
                <EqualButtonRow>
                  <EqualButton
                    type="button"
                    selected={japaneseLevel === "비즈니스 중급 (고급)"}
                    onClick={() => setJapaneseLevel("비즈니스 중급 (고급)")}
                  >
                    비즈니스 중급 (고급)
                  </EqualButton>
                  <EqualButton
                    type="button"
                    selected={japaneseLevel === "비즈니스 중급 (초급)"}
                    onClick={() => setJapaneseLevel("비즈니스 중급 (초급)")}
                  >
                    비즈니스 중급 (초급)
                  </EqualButton>
                  <EqualButton
                    type="button"
                    selected={japaneseLevel === "간단한 일본어 (면접 가능)"}
                    onClick={() =>
                      setJapaneseLevel("간단한 일본어 (면접 가능)")
                    }
                  >
                    간단한 일본어 (면접 가능)
                  </EqualButton>
                  <EqualButton
                    type="button"
                    selected={japaneseLevel === "일상 회화"}
                    onClick={() => setJapaneseLevel("일상 회화")}
                  >
                    일상 회화
                  </EqualButton>
                  <EqualButton
                    type="button"
                    selected={japaneseLevel === "매우 기본"}
                    onClick={() => setJapaneseLevel("매우 기본")}
                  >
                    매우 기본
                  </EqualButton>
                  <EqualButton
                    type="button"
                    selected={japaneseLevel === "불필요"}
                    onClick={() => setJapaneseLevel("불필요")}
                  >
                    불필요
                  </EqualButton>
                </EqualButtonRow>
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>필요영어 수준</Label>
                <EqualButtonRow>
                  <EqualButton
                    type="button"
                    selected={englishLevel === "유창함"}
                    onClick={() => setEnglishLevel("유창함")}
                  >
                    유창함
                  </EqualButton>
                  <EqualButton
                    type="button"
                    selected={englishLevel === "불필요"}
                    onClick={() => setEnglishLevel("불필요")}
                  >
                    불필요
                  </EqualButton>
                </EqualButtonRow>
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>필수 스킬</Label>
                <TextArea
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                  placeholder="필수 스킬을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>환영요건</Label>
                <TextArea
                  value={preferredConditions}
                  onChange={(e) => setPreferredConditions(e.target.value)}
                  placeholder="환영요건을 입력해 주세요"
                  required
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label>원하는 인재상</Label>
                <TextArea
                  value={idealCandidate}
                  onChange={(e) => setIdealCandidate(e.target.value)}
                  placeholder="원하는 인재상을 입력해 주세요"
                  required
                />
              </Column>
            </Row>
          </ColumnContainer>
        </RowContainer>

        {/* 버튼 영역 */}
        <ButtonContainer>
          <CancelButton type="button" onClick={handleBackClick}>
            돌아가기
          </CancelButton>
          <SubmitButton type="submit">등록하기</SubmitButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default RecruitmentRegister;
