import React, { useState, useEffect } from "react";
import "../styles/Play.css";

const numRows = 8;
const numCols = 7;
const numGemTypes = 6;

function generateRandomGem() {
  return Math.floor(Math.random() * numGemTypes);
}

export default function Play() {
  const [grid, setGrid] = useState<number[][]>([]);
  const [remainingTime, setRemainingTime] = useState<number>(120); // 2分のタイムリミット

  useEffect(() => {
    const newGrid = [];
    for (let row = 0; row < numRows; row++) {
      const newRow = [];
      for (let col = 0; col < numCols; col++) {
        newRow.push(generateRandomGem());
      }
      newGrid.push(newRow);
    }
    setGrid(newGrid);

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // 秒を分と秒に変換する関数
  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className="play-container">
      <div className="game-info">
        <div className="score-time-container">
          <div className="score">Score: 0</div>
          <div className="remaining-time">
            Time: {formatTime(remainingTime)}
          </div>
        </div>
        <div className="time-bar">
          <div
            className="time-remaining"
            style={{ width: `${(remainingTime / 120) * 100}%` }} // バーの長さを変更しない
          />
        </div>
      </div>
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((gemType: number, colIndex: number) => (
              <div key={colIndex} className={`gem gem-${gemType}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
