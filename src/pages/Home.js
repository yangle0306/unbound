import React from "react";
import ImageSlider from "../components/ImageSlider";
import LoginPrompt from "../components/LoginPrompt";
import CompanyList from "../components/CompanyList";

function Home() {
  return (
    <div>
      <ImageSlider />
      <LoginPrompt />
      <CompanyList />
    </div>
  );
}

export default Home;
