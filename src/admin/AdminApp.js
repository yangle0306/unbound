// adminApp.js
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Home from "./pages/Home";
import styled from "styled-components";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Member from "./pages/Member";
import MemberInfo from "./pages/MemberInfo";
import Company from "./pages/Company";
import CompanyUpload from "./pages/CompanyUpload";
import RecruitmentRegister from "./pages/RecruitmentRegister";
import Banner from "./pages/Banner";
import Staff from "./pages/Staff";
import Entry from "./pages/Entry";

// 전체 페이지를 감싸는 컨테이너
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function AdminApp() {
  const location = useLocation(); // 현재 경로 가져오기

  // /login 경로에서는 Navbar와 Footer를 제외
  const showNavbarAndFooter = location.pathname !== "/admin/login";

  return (
    <PageContainer>
      {showNavbarAndFooter && <Navbar />}
      <MainContent>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>관리자 메인페이지 | 언바운드</title>
                </Helmet>
                <Home />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Helmet>
                  <title>관리자 로그인 | 언바운드</title>
                </Helmet>
                <Login />
              </>
            }
          />
          <Route
            path="/members"
            element={
              <PrivateRoute>
                <Helmet>
                  <title>회원관리 | 언바운드</title>
                </Helmet>
                <Member />
              </PrivateRoute>
            }
          />

          <Route
            path="/members/:id"
            element={
              <PrivateRoute>
                <Helmet>
                  <title>회원관리 - 회원정보 | 언바운드</title>
                </Helmet>
                <MemberInfo />
              </PrivateRoute>
            }
          />

          <Route
            path="/entries"
            element={
              <PrivateRoute>
                <Helmet>
                  <title>엔트리 관리 | 언바운드</title>
                </Helmet>
                <Entry />
              </PrivateRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <PrivateRoute>
                <Helmet>
                  <title>메세지 | 언바운드</title>
                </Helmet>
                {/* 메세지*/}
              </PrivateRoute>
            }
          />

          <Route
            path="/companies"
            element={
              <PrivateRoute>
                <Helmet>
                  <title>기업 관리 | 언바운드</title>
                </Helmet>
                <Company />
              </PrivateRoute>
            }
          />

          <Route
            path="/companies/upload"
            element={
              <PrivateRoute>
                <Helmet>
                  <title>기업 관리 기업 등록 | 언바운드</title>
                </Helmet>
                <CompanyUpload />
              </PrivateRoute>
            }
          />

          <Route
            path="/recruitment/register/:companyId"
            element={
              <PrivateRoute>
                <Helmet>
                  <title>기업 관리 모집 등록 | 언바운드</title>
                </Helmet>
                <RecruitmentRegister />
              </PrivateRoute>
            }
          />

          <Route
            path="/banners"
            element={
              <PrivateRoute>
                <Helmet>
                  <title>배너 관리 | 언바운드</title>
                </Helmet>
                <Banner />
              </PrivateRoute>
            }
          />

          <Route
            path="/staff"
            element={
              <PrivateRoute>
                <Helmet>
                  <title>직원 관리 | 언바운드</title>
                </Helmet>
                <Staff />
              </PrivateRoute>
            }
          />
        </Routes>
      </MainContent>
      {showNavbarAndFooter && <Footer />}
    </PageContainer>
  );
}

export default AdminApp;
