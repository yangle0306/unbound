import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/reset.css"; // reset.css 파일 불러오기
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async"; // HelmetProvider 추가
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserApp from "./user/UserApp";
import AdminApp from "./admin/AdminApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <Routes>
          {/* 관리자 페이지는 adminApp에 연결 */}
          <Route path="/admin/*" element={<AdminApp />} />
          {/* 사용자 페이지는 userApp에 연결 */}
          <Route path="/*" element={<UserApp />} />
        </Routes>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
