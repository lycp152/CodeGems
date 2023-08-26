import React, { useState } from "react";
import "./styles/Home.css";
import Title from "./pages/Title";
import HowToPlay from "./pages/HowToPlay";
import Play from "./pages/Play";
import SideMenuButton from "./components/SideMenuButton";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHowToPlayVisible, setIsHowToPlayVisible] = useState(false);
  const [isDetailView, setDetailView] = useState(false);

  const toggleDetailView = () => {
    setIsHowToPlayVisible(!isHowToPlayVisible);
    setDetailView(!isDetailView);
  };

  return (
    <main className="main">
      <div className="main-contents">
        {isHowToPlayVisible ? (
          <HowToPlay />
        ) : isPlaying ? (
          <Play />
        ) : (
          <Title
            toggleDetailView={toggleDetailView}
            handlePlay={() => setIsPlaying(true)}
          />
        )}
        <SideMenuButton
          toggleDetailView={toggleDetailView}
          isDetailView={isDetailView}
          isPlaying={isPlaying}
        />
      </div>
      <footer>
        <p>Copyright © 2023 🧙草咲か爺さんズ All Rights Reserved.</p>
      </footer>
    </main>
  );
};

export default Home;
