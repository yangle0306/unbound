import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import Resume from "./components/Resume";
import GoogleLogin from "./components/GoogleLogin";
import PrivateRoute from "./components/PrivateRoute";
import CompanyDetail from "./components/CompanyDetail";
import FileUrlRegisterPage from "./pages/FileUrlRegisterPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<GoogleLogin />} />
            <Route path="/chat" element={<Chat />} />
            <Route
              path="/mypage"
              element={
                <PrivateRoute>
                  <MyPage />
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
            <Route path="/company/:id" element={<CompanyDetail />} />{" "}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
