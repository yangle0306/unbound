import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import AdminNewBanners from "./AdminNewBanners";

const Container = styled.div`
  width: 1280px;
  margin: 60px auto;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #313131;
  margin-bottom: 20px;
`;

const ListContainer = styled.div`
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const RegisterButton = styled.button`
  width: 140px;
  height: 44px;
  font-size: 15px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #313131;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e9e9e9;
  }

  &::after {
    content: "+";
    font-size: 36px;
    color: #dde2f1;
    margin-left: auto;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: 450px;
  overflow-y: auto;
  border: 1px solid #d9d9d9;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f8f9ff;
  color: #313131;
  padding: 15px;
  border: 1px solid #d9d9d9;
  position: sticky;
  top: -1px;
  z-index: 1;

  &:not(:last-child) {
    border-right: 1px solid #d9d9d9;
  }
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #d9d9d9;
  text-align: center;
  vertical-align: middle;
`;

const ImageWrapper = styled.div`
  width: 358px;
  height: 72px;
  border: 1px solid #b3b3b3;
  margin: auto; /* 이미지 중앙 정렬 */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

/* 슬라이드 토글 스타일 */
const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 63px;
  height: 32px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d9d9d9;
  border-radius: 32px;

  &::before {
    position: absolute;
    content: "${(props) => (props.$isActive ? "✓" : "")}";
    color: ${(props) => (props.$isActive ? "#d9d9d9" : "#838383")};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 24px;
    left: 4px;
    bottom: 4px;
    background-color: ${(props) => (props.$isActive ? "#1E388B" : "#838383")};
    border-radius: 50%;
    font-size: 16px;
    transform: ${(props) => (props.$isActive ? "translateX(31px)" : "none")};
  }

  /* ON/OFF 텍스트 추가 */
  &::after {
    content: "${(props) => (props.$isActive ? "ON" : "OFF")}";
    position: absolute;
    top: 50%;
    left: ${(props) => (props.$isActive ? "5px" : "30px")};
    transform: translateY(-50%);
    font-size: 15px;
    color: #313131;
    font-weight: bold;
  }
`;

const AdminBanners = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [banners, setBanners] = useState([
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/358x72",
      link: "https://via.placeholder.com/358x72",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      isActive: true,
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/358x72",
      link: "https://via.placeholder.com/358x72",
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      isActive: false,
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/358x72",
      link: "https://via.placeholder.com/358x72",
      startDate: "2024-03-04",
      endDate: "2024-09-30",
      isActive: false,
    },
    {
      id: 4,
      imageUrl: "https://via.placeholder.com/358x72",
      link: "https://via.placeholder.com/358x72",
      startDate: "2024-04-04",
      endDate: "2024-07-30",
      isActive: false,
    },
    {
      id: 5,
      imageUrl: "https://via.placeholder.com/358x72",
      link: "https://via.placeholder.com/358x72",
      startDate: "2024-05-01",
      endDate: "2024-12-30",
      isActive: false,
    },
    {
      id: 6,
      imageUrl: "https://via.placeholder.com/358x72",
      link: "https://via.placeholder.com/358x72",
      startDate: "2024-08-01",
      endDate: "2024-11-30",
      isActive: false,
    },
  ]);

  const toggleBannerStatus = (id) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
      )
    );
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  return (
    <Container>
      <Title>배너 등록</Title>
      <ListContainer>
        <ButtonContainer>
          <RegisterButton onClick={() => setModalOpen(true)}>
            공고등록
          </RegisterButton>
        </ButtonContainer>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>이미지</TableHeader>
                <TableHeader>링크</TableHeader>
                <TableHeader>시작일</TableHeader>
                <TableHeader>종료일</TableHeader>
                <TableHeader>상태 관리</TableHeader>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <TableData>
                    <ImageWrapper>
                      <Image src={banner.imageUrl} alt="배너 이미지" />
                    </ImageWrapper>
                  </TableData>
                  <TableData>
                    <a
                      href={banner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {banner.link}
                    </a>
                  </TableData>
                  <TableData>{banner.startDate}</TableData>
                  <TableData>{banner.endDate}</TableData>
                  <TableData>
                    <ToggleSwitch>
                      <Slider
                        $isActive={banner.isActive}
                        onClick={() => toggleBannerStatus(banner.id)}
                      />
                    </ToggleSwitch>
                  </TableData>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </ListContainer>

      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          <AdminNewBanners onClose={closeModal} />
        </Modal>
      )}
    </Container>
  );
};

export default AdminBanners;
