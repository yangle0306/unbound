import React from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Home from "./pages/Home";
import { UserProvider } from "../context/UserContext";
import Navbar from "./components/Navbar";
import GoogleLogin from "./pages/GoogleLogin";
import ChatPrivateRoute from "./components/ChatPrivateRoute";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/PrivateRoute";
import MyPage from "./pages/MyPage";
import Resume from "./pages/Resume";
import FileUrlRegisterPage from "./pages/FileUrlRegisterPage";
import CompanyDetail from "./pages/CompanyDetail";

function UserApp() {
  return (
    <UserProvider>
      <Navbar />
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
      </Routes>
    </UserProvider>
  );
}

export default UserApp;
