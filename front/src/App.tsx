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
  const [isResultView, setIsResultView] = useState(false); // 追加

  const handleDetailViewToggle = (view: DetailView) => {
    setDetailView(view);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setDetailView(DetailView.None);
    setScore(0);
    setRemainingTime(120);
    setIsResultView(false); // プレイが再開されたら Result ビューを非表示にする
  };

  // タイマーがゼロになったときに呼び出す関数
  const handleTimeUp = () => {
    setIsPlaying(false);
    setIsResultView(true); // Result ビューを表示
  };

  const renderDetailView = () => {
    if (isResultView) {
      return (
        <Result
          score={score}
          handleBack={() => {
            setIsResultView(false); // Result ビューを非表示にする
            handleDetailViewToggle(DetailView.None);
          }}
          handlePlay={() => handleDetailViewToggle(DetailView.None)}
        />
      );
    } else if (detailView === DetailView.HowToPlay) {
      return <HowToPlay />;
    } else if (detailView === DetailView.RewardNFT) {
      return <RewardNFT />;
    } else if (detailView === DetailView.GemSkin) {
      return <GemSkin />;
    } else if (detailView === DetailView.Ranking) {
      return <Ranking />;
    } else if (detailView === DetailView.None) {
      if (isPlaying) {
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
            handleTimeUp={handleTimeUp} // タイマーがゼロになったら呼び出す
          />
        );
      } else {
        return (
          <Title
            toggleHowToPlay={() => handleDetailViewToggle(DetailView.HowToPlay)}
            toggleRewardNFT={() => handleDetailViewToggle(DetailView.RewardNFT)}
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
