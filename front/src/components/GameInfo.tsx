import React from "react";

interface GameInfoProps {
  score: number;
  remainingTime: number;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

const GameInfo: React.FC<GameInfoProps> = ({ score, remainingTime }) => (
  <div className="game-info">
    <div className="score-time-container">
      <div className="score">Score: {score}</div>
      <div className="remaining-time">Time: {formatTime(remainingTime)}</div>
    </div>
    <div className="time-bar">
      <div
        className="time-remaining"
        style={{ width: `${(remainingTime / 120) * 100}%` }}
      />
    </div>
  </div>
);

export default GameInfo;
