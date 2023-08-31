import React, { useState } from "react";
import "./styles/Home.css";
import Title from "./pages/Title";
import HowToPlay from "./pages/HowToPlay";
import RewardNFT from "./pages/RewardNFT";
import GemSkin from "./pages/GemSkin";
import Ranking from "./pages/Ranking";
import Play from "./pages/Play";
import Result from "./pages/Result"; // Import the Result component
import SideMenuButton from "./components/SideMenuButton";

enum DetailView {
  None,
  HowToPlay,
  RewardNFT,
  GemSkin,
  Ranking,
}

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [detailView, setDetailView] = useState(DetailView.None);
  const [remainingTime, setRemainingTime] = useState<number>(120);
  const [score, setScore] = useState<number>(0);

  const handleDetailViewToggle = (view: DetailView) => {
    setIsPlaying(false);
    setDetailView(view);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setDetailView(DetailView.None);
  };

  return (
    <main className="main">
      <div className="main-contents">
        {detailView === DetailView.HowToPlay ? (
          <HowToPlay />
        ) : detailView === DetailView.RewardNFT ? (
          <RewardNFT />
        ) : detailView === DetailView.GemSkin ? (
          <GemSkin />
        ) : detailView === DetailView.Ranking ? (
          <Ranking />
        ) : isPlaying ? (
          remainingTime <= 0 ? (
            <Result score={score} />
          ) : (
            <Play
              remainingTime={remainingTime}
              setRemainingTime={setRemainingTime}
              score={score}
              setScore={setScore}
            />
          )
        ) : (
          <Title
            toggleHowToPlay={() => handleDetailViewToggle(DetailView.HowToPlay)}
            toggleRewardNFT={() => handleDetailViewToggle(DetailView.RewardNFT)}
            toggleGemSkin={() => handleDetailViewToggle(DetailView.GemSkin)}
            toggleRanking={() => handleDetailViewToggle(DetailView.Ranking)}
            handlePlay={handlePlay}
          />
        )}
        <SideMenuButton
          toggleHowToPlay={() => handleDetailViewToggle(DetailView.HowToPlay)}
          toggleBackToTitle={() => setDetailView(DetailView.None)}
          isDetailView={detailView !== DetailView.None}
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
