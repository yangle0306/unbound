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
                <title>홈 | 언바운드</title> {/* 홈 페이지 타이틀 */}
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
                  <title>채팅 | 언바운드</title> {/* 채팅 페이지 타이틀 */}
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
                  {/* 마이페이지 타이틀 */}
                  <title>마이 페이지 | 언바운드</title>
                </Helmet>
                <MyPage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/resume-upload"
          element={
            <PrivateRoute>
              <Resume />
            </PrivateRoute>
          }
        />
        <Route
          path="/resume/edit"
          element={
            <PrivateRoute>
              <Resume />
            </PrivateRoute>
          }
        />
        <Route
          path="/file-upload"
          element={
            <PrivateRoute>
              <FileUrlRegisterPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/url-upload"
          element={
            <PrivateRoute>
              <FileUrlRegisterPage />
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
                {/* 마이페이지 타이틀 */}
                <title>관리자 메인페이지 | 언바운드</title>
              </Helmet>
              <AdminNavbar />
              <AdminMembers />
            </>
          }
        />
        <Route
          path="/admin/members"
          element={
            <>
              <Helmet>
                {/* 마이페이지 타이틀 */}
                <title>회원관리 메인페이지 | 언바운드</title>
              </Helmet>
              <AdminNavbar />
              <AdminMembers />
            </>
          }
        />
        <Route
          path="/admin/login"
          element={
            <>
              <Helmet>
                {/* 마이페이지 타이틀 */}
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
