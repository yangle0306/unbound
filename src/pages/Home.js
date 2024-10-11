import React, { useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import LoginPrompt from "../components/LoginPrompt";
import CompanyList from "../components/CompanyList";
import UserProfile from "../components/UserProfile";
import { auth } from "../firebase"; // Firebase auth import
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

function Home() {
  const [data, setData] = useState(null); // 데이터를 저장할 상태 변수
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [user, setUser] = useState(null); // 사용자 로그인 상태

  // API로부터 데이터 가져오기
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/main`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // 로그인 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // 로그인된 사용자 정보 설정
      } else {
        setUser(null); // 로그아웃 상태
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 해제
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
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
