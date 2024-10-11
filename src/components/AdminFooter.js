import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  height: 100px;
  background-color: #f8f9ff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 140px;
`;

const FooterInfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterInfobox = styled.div`
  display: flex;
`;

const FooterCopyRightSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterCopyRightBox = styled.div`
  display: flex;
`;

const FooterText = styled.p`
  font-size: 15px;
  color: #313131;
  line-height: 1.5;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const FooterLink = styled.a`
  font-size: 15px;
  color: #313131;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
    color: #007bff;
  }
`;

const AdminFooter = () => {
  return (
    <FooterContainer>
      <FooterInfoSection>
        <FooterInfobox>
          <FooterText>주식회사 언바운드</FooterText>
          <FooterText>대표: 홍길동</FooterText>
          <FooterText>사업자 번호: 123-45-67890</FooterText>
          <FooterText>이메일: contact@abc.com</FooterText>
        </FooterInfobox>
        <FooterInfobox>
          <FooterText>주소: 서울특별시 강남구 테헤란로 123</FooterText>
        </FooterInfobox>
      </FooterInfoSection>
      <FooterCopyRightSection>
        <FooterCopyRightBox>
          <FooterText>© 2024 언바운드. All rights reserved.</FooterText>
        </FooterCopyRightBox>
        <FooterCopyRightBox>
          <FooterLinks>
            <FooterLink href="#">이용약관</FooterLink>
            <FooterLink href="#">개인정보취급방침</FooterLink>
          </FooterLinks>
        </FooterCopyRightBox>
      </FooterCopyRightSection>
    </FooterContainer>
  );
};

export default AdminFooter;
