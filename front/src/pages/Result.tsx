import React from "react";
import "../styles/Result.css";
import LongButton from "../components/LongButton";
import RankingContainer from "../components/RankingContainer";

interface ResultProps {
  score: number;
  handleBack: () => void;
  handlePlay: () => void;
}

export default function Result({ score, handleBack, handlePlay }: ResultProps) {
  return (
    <div className="result-container">
      <h1 className="title">Result</h1>
      <div className="result-content">
        <div className="score">Score: {score}</div>
        <RankingContainer />
        <div className="result-buttons">
          <div className="button-wrapper">
            <LongButton label="Share" />
            <LongButton label="Retry" onClick={handlePlay} />
          </div>
        </div>
      </div>
    </div>
  );
}
