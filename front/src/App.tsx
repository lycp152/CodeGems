import React, { useState } from "react";
import "./styles/Home.css";
import Title from "./pages/Title";
import HowToPlay from "./pages/HowToPlay";
import RewardNFT from "./pages/RewardNFT";
import GemSkin from "./pages/GemSkin";
import Ranking from "./pages/Ranking";
import Play from "./pages/Play";
import Result from "./pages/Result";
import SideMenuButton from "./components/SideMenuButton";

enum DetailView {
  None,
  HowToPlay,
  RewardNFT,
  GemSkin,
  Ranking,
  Result,
}

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [detailView, setDetailView] = useState(DetailView.None);
  const [remainingTime, setRemainingTime] = useState<number>(120);
  const [score, setScore] = useState<number>(0);

  const handleDetailViewToggle = (view: DetailView) => {
    // if (isPlaying) {
    //   setIsPlaying(false);
    // }
    setDetailView(view);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setDetailView(DetailView.None);
    setScore(0);
    setRemainingTime(120);
  };

  const renderDetailView = () => {
    if (isPlaying) {
      if (remainingTime <= 0) {
        return (
          <Result
            score={score}
            handleBack={() => handleDetailViewToggle(DetailView.None)}
            handlePlay={() => handleDetailViewToggle(DetailView.None)}
          />
        );
      }
      return (
        <Play
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
          score={score}
          setScore={setScore}
          toggleBackToTitle={() => {
            setIsPlaying(false);
            handleDetailViewToggle(DetailView.None);
          }}
        />
      );
    } else {
      switch (detailView) {
        case DetailView.HowToPlay:
          return <HowToPlay />;
        case DetailView.RewardNFT:
          return <RewardNFT />;
        case DetailView.GemSkin:
          return <GemSkin />;
        case DetailView.Ranking:
          return <Ranking />;
        default:
          return (
            <Title
              toggleHowToPlay={() =>
                handleDetailViewToggle(DetailView.HowToPlay)
              }
              toggleRewardNFT={() =>
                handleDetailViewToggle(DetailView.RewardNFT)
              }
              toggleGemSkin={() => handleDetailViewToggle(DetailView.GemSkin)}
              toggleRanking={() => handleDetailViewToggle(DetailView.Ranking)}
              handlePlay={handlePlay}
            />
          );
      }
    }
  };

  return (
    <main className="main">
      <div className="main-contents">
        {renderDetailView()}
        <SideMenuButton
          toggleHowToPlay={() => handleDetailViewToggle(DetailView.HowToPlay)}
          toggleBackToTitle={() => handleDetailViewToggle(DetailView.None)}
          toggleBackToPlay={() => {
            setDetailView(DetailView.None);
          }}
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
