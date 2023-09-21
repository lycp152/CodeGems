import React from "react";
import "../styles/GemSkin.css";
import SearchBar from "../components/SearchBar";
import NumberedImage from "../components/NumberedImage";
import LongButton from "../components/LongButton";

const gemData = [
  { number: 1, imageSrc: "image1.jpg", label: "gem 1" },
  { number: 2, imageSrc: "image2.jpg", label: "gem 2" },
  { number: 3, imageSrc: "image3.jpg", label: "gem 3" },
  { number: 4, imageSrc: "image4.jpg", label: "gem 4" },
  { number: 5, imageSrc: "image5.jpg", label: "gem 5" },
  { number: 6, imageSrc: "image6.jpg", label: "gem 6" },
];

const buttonLabels = [
  "Programming Languages",
  "Frontend Development",
  "Backend Development",
  "Mobile App Development",
  "AI/ML",
  "Database",
  "Data Visualization",
  "Devops",
  "Backend as a Service(BaaS)",
  "Framework",
  "Testing",
  "Software",
  "Static Site Generators",
  "Game Engines",
  "Other",
];

export default function GemSkin() {
  const handleSearch = (query: string) => {
    // 検索処理を実行
    console.log("検索クエリ:", query);
  };

  return (
    <div className="gem-skin-container">
      <h1 className="title">Gem Skin</h1>
      <div className="gem-skin-content">
        <div className="selected-gem-container">
          {gemData.map((gem) => (
            <NumberedImage
              key={gem.number}
              number={gem.number}
              imageSrc={gem.imageSrc}
              label={gem.label}
            />
          ))}
        </div>
        <SearchBar onSearch={handleSearch} />
        <div className="buttons-container">
          {buttonLabels.map((label) => (
            <LongButton key={label} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
}
