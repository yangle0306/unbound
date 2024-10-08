import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ImageSlider from "../components/ImageSlider";
import LoginPrompt from "../components/LoginPrompt";
import CompanyList from "../components/CompanyList";
import UserProfile from "../components/UserProfile";

function Home() {
  const { isLoggedIn } = useContext(AuthContext); // 로그인 상태 가져오기
  const [data, setData] = useState(null); // 데이터를 저장할 상태 변수
  const [loading, setLoading] = useState(true); // 로딩 상태

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

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }
  return (
    <div>
      {/* ImageSlider에 banners 데이터를 전달 */}
      <ImageSlider banners={data.banners} />
      {isLoggedIn ? <UserProfile /> : <LoginPrompt />}
      {/* CompanyList에 companyList 데이터를 전달 */}
      <CompanyList companies={data.companyList} />
    </div>
  );
}

export default Home;
