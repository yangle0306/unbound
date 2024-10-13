import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import MyPage from "./pages/MyPage";
import Resume from "./components/Resume";
import GoogleLogin from "./components/GoogleLogin";
import PrivateRoute from "./components/PrivateRoute";
import CompanyDetail from "./components/CompanyDetail";
import FileUrlRegisterPage from "./pages/FileUrlRegisterPage";
import { Helmet } from "react-helmet-async";
import AdminLoginPage from "./pages/AdminLoginPage";
import ChatPrivateRoute from "./components/ChatPrivateRoute";
import AdminNavbar from "./components/AdminNavbar";
import AdminMembers from "./components/AdminMembers";
import AdminHome from "./pages/AdminHome";
import AdminFooter from "./components/AdminFooter";
import styled from "styled-components";
import AdminMembersInfo from "./components/AdminMembersInfo";

// 전체 페이지를 감싸는 컨테이너
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체 높이 */
`;

const MainContent = styled.main`
  flex: 1; /* 남은 공간을 차지하게 만들어 footer가 하단으로 밀리게 함 */
`;

function App() {
  const location = useLocation();

  // /admin 경로에서는 Navbar를 제외
  const showNavbar = !location.pathname.startsWith("/admin");

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Helmet>
                <title>홈 | 언바운드</title>
              </Helmet>
              <Home />
            </>
          }
        />
        <Route path="/login" element={<GoogleLogin />} />
        <Route
          path="/chat"
          element={
            <ChatPrivateRoute>
              <>
                <Helmet>
                  <title>채팅 | 언바운드</title>
                </Helmet>
                <Chat />
              </>
            </ChatPrivateRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <>
                <Helmet>
                  <title>마이 페이지 | 언바운드</title>
                </Helmet>
                <MyPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/resume/upload"
          element={
            <PrivateRoute>
              <>
                <Helmet>
                  <title>이력서 | 언바운드</title>
                </Helmet>
                <Resume />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/resume/edit"
          element={
            <PrivateRoute>
              <>
                <Helmet>
                  <title>이력서 | 언바운드</title>
                </Helmet>
                <Resume />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/file/upload"
          element={
            <PrivateRoute>
              <>
                <Helmet>
                  <title>파일URL | 언바운드</title>
                </Helmet>
                <FileUrlRegisterPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/url/upload"
          element={
            <PrivateRoute>
              <>
                <Helmet>
                  <title>파일URL | 언바운드</title>
                </Helmet>
                <FileUrlRegisterPage />
              </>
            </PrivateRoute>
          }
        />
        <Route path="/company/:id" element={<CompanyDetail />} />
        {/* 관리자 페이지 라우트 */}
        <Route
          path="/admin"
          element={
            <>
              <Helmet>
                <title>관리자 메인페이지 | 언바운드</title>
              </Helmet>
              <PageContainer>
                <AdminNavbar />
                <MainContent>
                  <AdminHome />
                </MainContent>
                <AdminFooter />
              </PageContainer>
            </>
          }
        />
        <Route
          path="/admin/members"
          element={
            <>
              <Helmet>
                <title>회원관리 | 언바운드</title>
              </Helmet>
              <PageContainer>
                <AdminNavbar />
                <MainContent>
                  <AdminMembers />
                </MainContent>
                <AdminFooter />
              </PageContainer>
            </>
          }
        />

        <Route
          path="/admin/members/:id"
          element={
            <>
              <Helmet>
                <title>회원관리 - 회원정보 | 언바운드</title>
              </Helmet>
              <PageContainer>
                <AdminNavbar />
                <MainContent>
                  <AdminMembersInfo />
                </MainContent>
                <AdminFooter />
              </PageContainer>
            </>
          }
        />
        <Route
          path="/admin/login"
          element={
            <>
              <Helmet>
                <title>관리자 로그인 | 언바운드</title>
              </Helmet>
              <AdminLoginPage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
