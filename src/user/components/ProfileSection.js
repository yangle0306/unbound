import React, { useState } from "react";
import styled from "styled-components";
import FileUploadSVG from "../../assets/fileupload.svg";
import UrlUploadSVG from "../../assets/urlupload.svg";
import ResumeUploadSVG from "../../assets/resumeupload.svg";
import Modal from "../../components/Modal";
import FileUrlRegister from "./FileUrlRegister";
import ResumeNotRegistered from "./ResumeNotRegistered";

// 프로필 컨테이너 스타일
const Container = styled.div`
  width: 394px;
  height: 202px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
`;

// 헤더 스타일
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

// 프로필 정보 섹션 스타일
const Info = styled.div`
  display: flex;
  align-items: center;
`;

// 프로필 이미지 스타일
const Image = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`;

// 프로필 텍스트 섹션 스타일
const Text = styled.div`
  display: flex;
  flex-direction: column;
`;

// 사용자 이름 스타일
const Name = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #313131;
  margin: 0;
`;

// 설명 텍스트 스타일
const Desc = styled.p`
  font-size: 12px;
  color: #313131;
  margin-top: 10px;
`;

// 로그아웃 텍스트 스타일
const Logout = styled.span`
  font-size: 12px;
  color: #838383;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// 이력서 섹션 스타일
const Resume = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 섹션 타이틀 스타일
const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #313131;
`;

// 구분선 스타일
const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;

// 버튼 그룹 스타일
const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
`;

// 아이콘 버튼 스타일
const Button = styled.button`
  width: 111px;
  height: 37px;
  background-color: transparent;
  border: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

// 체크박스 섹션 스타일
const CheckMark = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

// 체크박스 스타일
const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #16994c;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 5px;

  &::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 5px;
    width: 6px;
    height: 10px;
    border: solid #16994c;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

// 확인 텍스트 스타일
const ConfirmText = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #00a04d;
`;

const ProfileSection = ({ user, userData, onLogout, onResumeUpload }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isResumeNotRegistered, setResumeNotRegistered] = useState(false);

  const handleClick = async () => {
    try {
      // API 호출을 통해 이력서 등록 상태를 확인
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/me`, // 이력서 확인을 위한 API 엔드포인트
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`, // 사용자 토큰을 Authorization 헤더에 포함
          },
        }
      );

      const result = await response.json();
      // API 응답에 따라 모달 상태 설정
      if (
        !result.name ||
        !result.birth ||
        !result.sex ||
        !result.finalEducation ||
        !result.phone
      ) {
        setResumeNotRegistered(true); // 이력서가 없으면 등록되지 않은 상태로 설정
      } else {
        setResumeNotRegistered(false); // 이력서가 있으면 파일 업로드/URL 등록 모달 띄움
      }

      setModalOpen(true); // 모달을 띄움
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  // userData가 없으면 user 데이터를 대신 사용하도록 설정
  const displayName = userData?.name || user?.displayName;
  const photoURL = userData?.photo.url || user?.photoURL;
  const resume =
    userData?.name &&
    userData?.birth &&
    userData?.sex &&
    userData?.finalEducation &&
    userData?.phone;

  return (
    <>
      <Container>
        <Header>
          <Info>
            <Image src={photoURL} alt="Profile" />
            <Text>
              <Name>{displayName}</Name>
              {!resume && <Desc>이력서 작성하고 공고에 지원하세요.</Desc>}
            </Text>
          </Info>
          <Logout onClick={onLogout}>로그아웃</Logout>
        </Header>
        <Resume>
          <Title>나의 이력서</Title>
          {resume && (
            <CheckMark>
              <Circle />
              <ConfirmText>이력서가 등록되었습니다.</ConfirmText>
            </CheckMark>
          )}
        </Resume>
        <Divider />
        <Buttons>
          <Button
            style={{ backgroundImage: `url(${FileUploadSVG})` }}
            onClick={handleClick}
          />
          <Button
            style={{ backgroundImage: `url(${UrlUploadSVG})` }}
            onClick={handleClick}
          />
          <Button
            style={{ backgroundImage: `url(${ResumeUploadSVG})` }}
            onClick={onResumeUpload}
          />
        </Buttons>
      </Container>
      <Modal isOpen={isModalOpen}>
        {isResumeNotRegistered ? (
          <ResumeNotRegistered onClose={() => setModalOpen(false)} />
        ) : (
          <FileUrlRegister user={user} onClose={() => setModalOpen(false)} />
        )}
      </Modal>
    </>
  );
};

export default ProfileSection;
