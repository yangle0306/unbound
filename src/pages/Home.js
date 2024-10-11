import React, { useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import LoginPrompt from "../components/LoginPrompt";
import CompanyList from "../components/CompanyList";
import UserProfile from "../components/UserProfile";
import { auth } from "../firebase"; // Firebase auth import
import { signOut } from "firebase/auth";
import { useUser } from "../context/UserContext"; // useUser로 로그인 상태 확인

function Home() {
  const { user, loading } = useUser(); // useUser 훅으로 로그인 상태와 로딩 상태 가져오기
  const [data, setData] = useState(null); // 데이터를 저장할 상태 변수
  const [loadingData, setLoadingData] = useState(true); // API 로딩 상태

  // API로부터 데이터 가져오기
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/main`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingData(false);
      });
  }, []);

  if (loading || loadingData) {
    return <div>Loading...</div>; // Firebase 상태나 API 데이터가 로딩 중일 때 표시
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      {/* ImageSlider에 banners 데이터를 전달 */}
      <ImageSlider banners={data.banners} />

      {/* 로그인 상태에 따라 UserProfile 또는 LoginPrompt 렌더링 */}
      {user ? (
        <UserProfile user={user} onLogout={handleLogout} />
      ) : (
        <LoginPrompt />
      )}

      {/* CompanyList에 companyList 데이터를 전달 */}
      <CompanyList companies={data.companyList} />
    </div>
  );
}

export default Home;
