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
  const github_client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const github_oauth_url = `https://github.com/login/oauth/authorize?client_id=${github_client_id}&scope=user:read`;

  const handleDetailViewToggle = (view: DetailView) => {
    setIsPlaying(false);
    setDetailView(view);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setDetailView(DetailView.None);
    setScore(0); // Reset the score when starting a new play
    setRemainingTime(120); // Reset the remaining time when starting a new play
  };

  const renderDetailView = () => {
    switch (detailView) {
      case DetailView.HowToPlay:
        return <HowToPlay />;
      case DetailView.RewardNFT:
        return <RewardNFT />;
      case DetailView.GemSkin:
        return <GemSkin />;
      case DetailView.Ranking:
        return <Ranking />;
      case DetailView.Result:
        return (
          <Result
            score={score}
            handleBack={() => handleDetailViewToggle(DetailView.None)}
            handlePlay={() => handleDetailViewToggle(DetailView.None)}
          />
        );
      default:
        if (isPlaying) {
          if (remainingTime <= 0) {
            handleDetailViewToggle(DetailView.Result);
          }
          return (
            <Play
              remainingTime={remainingTime}
              setRemainingTime={setRemainingTime}
              score={score}
              setScore={setScore}
              toggleBackToTitle={() => handleDetailViewToggle(DetailView.None)}
            />
          );
        } else {
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
          toggleBackToTitle={() => setDetailView(DetailView.None)}
          toggleBackToPlay={() => setDetailView(DetailView.None)}
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
