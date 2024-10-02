import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ImageSlider from "../components/ImageSlider";
import LoginPrompt from "../components/LoginPrompt";
import CompanyList from "../components/CompanyList";
import UserProfile from "../components/UserProfile";

function Home() {
  const { isLoggedIn } = useContext(AuthContext); // 로그인 상태 가져오기
  return (
    <div>
      <ImageSlider />
      {isLoggedIn ? <UserProfile /> : <LoginPrompt />}
      <CompanyList />
    </div>
  );
}

export default Home;
