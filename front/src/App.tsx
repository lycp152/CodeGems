import React, { useState } from "react";
import "./styles/Home.css";
import Title from "./pages/Title";
import HowToPlay from "./pages/HowToPlay";
import RewardNFT from "./pages/RewardNFT";
import GemSkin from "./pages/GemSkin";
import Ranking from "./pages/Ranking";
import Play from "./pages/Play";
import SideMenuButton from "./components/SideMenuButton";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHowToPlay, setIsHowToPlay] = useState(false);
  const [isRewardNFT, setIsRewardNFT] = useState(false);
  const [isGemSkin, setIsGemSkin] = useState(false);
  const [isRanking, setIsRanking] = useState(false);
  const [isDetailView, setDetailView] = useState(false);

  const toggleHowToPlay = () => {
    setIsHowToPlay(!isHowToPlay);
    setDetailView(!isDetailView);
  };

  const toggleRewardNFT = () => {
    setIsRewardNFT(!isRewardNFT);
    setDetailView(!isDetailView);
  };

  const toggleGemSkin = () => {
    setIsGemSkin(!isGemSkin);
    setDetailView(!isDetailView);
  };

  const toggleRanking = () => {
    setIsRanking(!isRanking);
    setDetailView(!isDetailView);
  };

  return (
    <main className="main">
      <div className="main-contents">
        {isHowToPlay ? (
          <HowToPlay />
        ) : isRewardNFT ? (
          <RewardNFT />
        ) : isGemSkin ? (
          <GemSkin />
        ) : isRanking ? (
          <Ranking />
        ) : isPlaying ? (
          <Play />
        ) : (
          <Title
            toggleHowToPlay={toggleHowToPlay}
            toggleRewardNFT={toggleRewardNFT}
            toggleGemSkin={toggleGemSkin}
            toggleRanking={toggleRanking}
            handlePlay={() => setIsPlaying(true)}
          />
        )}
        <SideMenuButton
          toggleHowToPlay={toggleHowToPlay}
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
