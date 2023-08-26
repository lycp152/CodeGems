import React, { useState } from "react";
import "./styles/Home.css";
import Title from "./pages/Title";
import HowToPlay from "./pages/HowToPlay";
import Play from "./pages/Play";
import SideMenuButton from "./components/SideMenuButton";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [isPlaying] = useState(false); //setIsPlayingは未使用
  const [isHowToPlayVisible, setIsHowToPlayVisible] = useState(false);
  const [isDetailView, setDetailView] = useState(false);

  const toggleDetailView = () => {
    setIsHowToPlayVisible(!isHowToPlayVisible);
    setDetailView(!isDetailView);
  };

  return (
    <main className="main">
      <div className="main-contents">
        {isPlaying ? (
          <Play />
        ) : isHowToPlayVisible ? (
          <HowToPlay />
        ) : (
          <Title toggleDetailView={toggleDetailView} />
        )}
        <SideMenuButton
          toggleDetailView={toggleDetailView}
          isDetailView={isDetailView}
        />
      </div>
      <footer>
        <p>Copyright © 2023 🧙草咲か爺さんズ All Rights Reserved.</p>
      </footer>
    </main>
  );
};

export default Home;
