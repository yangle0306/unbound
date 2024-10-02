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
            <Route path="/mypage" element={<MyPage />} />
            <Route
              path="/resume-upload"
              element={
                <PrivateRoute>
                  <Resume />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
