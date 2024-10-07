import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

const RoundedContainer = styled.div`
  width: 500px;
  height: 272px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const WithdrawalText = styled.div`
  width: 439px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 수직 중앙 정렬 */
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold; /* 볼드체 */
  color: #1e388b;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #838383;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 45%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    opacity: 0.8;
  }
`;

const CancelButton = styled(Button)`
  font-size: 20px;
  font-weight: bold; /* 볼드체 */
  background-color: #f8f9ff; /* 아니오 버튼 색상 */
  border: 1px solid #e0e0e0; /* 테두리 */
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 그림자 적용 */
  color: #1e388b;

  &:hover {
    background-color: #b3b3b3;
  }
`;

const ConfirmButton = styled(Button)`
  font-size: 20px;
  font-weight: bold; /* 볼드체 */
  background-color: #1e388b; /* 확인 버튼 색상 */
  border: 1px solid #e0e0e0; /* 테두리 */
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 그림자 적용 */
  color: #ffffff;

  &:hover {
    background-color: #3f5ba9;
  }
`;

function Withdrawal({ onClose }) {
  const { logout } = useContext(AuthContext); // logout 함수 가져오기

  const handleLogout = () => {
    logout(); // 로그아웃 처리
    alert("로그아웃 되었습니다!"); // 로그아웃 버튼 클릭 시 동작
    onClose(); // 로그아웃 후 모달 닫기
  };

  return (
    <RoundedContainer>
      <WithdrawalText>
        <Title>탈퇴하시겠습니까?</Title>
        <Description>
          탈퇴 버튼 선택 시, 계정은 삭제되며
          <br /> 복구되지 않습니다.
        </Description>
      </WithdrawalText>

      <ButtonGroup>
        <CancelButton onClick={onClose}>이전</CancelButton>
        {/*일단 로그아웃 처리.*/}
        <ConfirmButton onClick={handleLogout}>확인</ConfirmButton>
      </ButtonGroup>
    </RoundedContainer>
  );
}

export default Withdrawal;
