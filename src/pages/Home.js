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
  const [userData, setUserData] = useState(null); // /api/me에서 가져올 사용자 데이터 상태
  const [photoData, setPhotoData] = useState(null); // /api/files?type=photo에서 가져올 사진 데이터 상태
  const [loadingUserData, setLoadingUserData] = useState(true); // /api/me 로딩 상태
  const [loadingPhotoData, setLoadingPhotoData] = useState(true); // /api/files?type=photo 로딩 상태

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

  useEffect(() => {
    if (user && user.accessToken) {
      const fetchUserData = fetch(`${process.env.REACT_APP_API_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`, // 사용자 인증 토큰 추가
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data); // 가져온 사용자 데이터를 상태에 저장
        });

      const fetchPhotoData = fetch(
        `${process.env.REACT_APP_API_URL}/api/files?type=photo`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`, // 사용자 인증 토큰 추가
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch photo data");
          }
          return response.json();
        })
        .then((data) => {
          setPhotoData(
            data.fileList && data.fileList.length > 0 ? data.fileList[0] : null
          ); // 첫 번째 사진 데이터 저장
        });

      // Promise.all을 사용하여 두 fetch 요청을 병렬 처리
      Promise.all([fetchUserData, fetchPhotoData])
        .then(() => {
          setLoadingUserData(false); // 두 데이터가 모두 성공적으로 로딩되면 로딩 상태 해제
          setLoadingPhotoData(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoadingUserData(false); // 에러 발생 시 로딩 상태 해제
          setLoadingPhotoData(false);
        });
    } else {
      // user가 없으면 로딩 상태 해제
      setLoadingPhotoData(false);
      setLoadingUserData(false);
    }
  }, [user]);

  // 로딩 상태 처리
  if (loading || loadingData || loadingUserData || loadingPhotoData) {
    return null; // 로딩 중일 때 화면 전체를 덮는 오버레이 표시
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
    <>
      {/* ImageSlider에 banners 데이터를 전달 */}
      <ImageSlider banners={data.banners} />

      {/* 로그인 상태에 따라 UserProfile 또는 LoginPrompt 렌더링 */}
      {user ? (
        <UserProfile
          user={user}
          userData={userData}
          photo={photoData}
          onLogout={handleLogout}
        />
      ) : (
        <LoginPrompt />
      )}

      {/* CompanyList에 companyList 데이터를 전달 */}
      <CompanyList companies={data.companyList} />
    </>
  );
}

export default Home;
