import React from "react";

interface GameInfoProps {
  score: number;
  remainingTime: number;
}

const GameInfo: React.FC<GameInfoProps> = ({ score, remainingTime }) => {
  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className="game-info">
      <div className="score-time-container">
        <div className="score">score: {score}</div>
        <div className="remaining-time">time: {formatTime(remainingTime)}</div>
      </div>
      <div className="time-bar">
        <div
          className="time-remaining"
          style={{ width: `${(remainingTime / 120) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default GameInfo;
