import React from "react";
import LongButton from "../components/LongButton";
import "../styles/GemSkin.css";
import SearchBar from "../components/SearchBar";
import NumberedImage from "../components/NumberedImage";

export default function GemSkin() {
  const handleSearch = (query: string) => {
    // 検索処理を実行
    console.log("検索クエリ:", query);
  };
  return (
    <div className="title-container">
      <h1 className="title">gemSkin</h1>
      <div className="main-container">
        <div className="selected-gem-container">
          <NumberedImage number={1} imageSrc="image1.jpg" label="gem 1" />
          <NumberedImage number={2} imageSrc="image2.jpg" label="gem 2" />
          <NumberedImage number={3} imageSrc="image3.jpg" label="gem 3" />
          <NumberedImage number={4} imageSrc="image4.jpg" label="gem 4" />
          <NumberedImage number={5} imageSrc="image5.jpg" label="gem 5" />
          <NumberedImage number={6} imageSrc="image6.jpg" label="gem 6" />
        </div>
        <SearchBar onSearch={handleSearch} />
        <div className="buttons-container">
          <LongButton label="Programming Languages" />
          <LongButton label="Frontend Development" />
          <LongButton label="Backend Development" />
          <LongButton label="Mobile App Development" />
          <LongButton label="AI/ML" />
          <LongButton label="Database" />
          <LongButton label="Data Visualization" />
          <LongButton label="Devops" />
          <LongButton label="Backend as a Service(BaaS)" />
          <LongButton label="Framework" />
          <LongButton label="Testing" />
          <LongButton label="Software" />
          <LongButton label="Static Site Generators" />
          <LongButton label="Game Engines" />
          <LongButton label="Other" />
        </div>
      </div>
    </div>
  );
}
