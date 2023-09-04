import React from "react";
import "../styles/Result.css";
import LongButton from "../components/LongButton";
import RankingContainer from "../components/RankingContainer"; // 新しいコンポーネントをインポート

interface ResultProps {
  score: number;
  handleBack: () => void;
  handlePlay: () => void;
}

export default function Result({ score, handleBack, handlePlay }: ResultProps) {
  return (
    <div className="title-container">
      <h1 className="title">result</h1>
      <div className="main-container">
        <div className="score">score: {score}</div>
        <RankingContainer />{" "}
        {/* 新しい RankingContainer コンポーネントを追加 */}
        <div className="result-button-container">
          <div className="button-wrapper">
            <LongButton label="Share" />
            <LongButton label="Retry" onClick={handlePlay} />
          </div>
        </div>
      </div>
    </div>
  );
}
