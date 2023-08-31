import React, { useState, useEffect } from "react";
import "../styles/Play.css";

const numRows = 8;
const numCols = 7;
const numGemTypes = 6;

interface GemBackgroundColors {
  [color: string]: number;
}

const gemBackgroundColors: GemBackgroundColors = {
  "#12151A": 1,
  "#0E351F": 2,
  "#0D5C25": 3,
  "#249932": 4,
  "#34CE42": 5,
};

function generateRandomGem() {
  return Math.floor(Math.random() * numGemTypes);
}

function generateRandomBackgroundColor() {
  const backgroundColors = Object.keys(gemBackgroundColors);
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randomIndex];
}

export default function Play() {
  const [grid, setGrid] = useState<
    { gemValue: number; backgroundColor: string }[][]
  >([]);
  const [remainingTime, setRemainingTime] = useState<number>(120); // 2分のタイムリミット
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const newGrid: { gemValue: number; backgroundColor: string }[][] = [];
    for (let row = 0; row < numRows; row++) {
      const newRow: { gemValue: number; backgroundColor: string }[] = [];
      for (let col = 0; col < numCols; col++) {
        const gemValue = generateRandomGem();
        const backgroundColor = generateRandomBackgroundColor();
        newRow.push({ gemValue, backgroundColor });
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

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  function handleGemClick(row: number, col: number) {
    const gem = grid[row][col];
    const backgroundColor = Object.keys(gemBackgroundColors).find(
      (color) => gemBackgroundColors[color] === gem.gemValue
    );
    if (backgroundColor) {
      const multiplier = gemBackgroundColors[backgroundColor];
      setScore((prevScore) => prevScore + multiplier);
      gem.gemValue = -1; // ジェムをクリックした場所の値を-1に変更
      setGrid([...grid]);
    }
  }

  return (
    <div className="play-container">
      <div className="game-info">
        <div className="score-time-container">
          <div className="score">Score: {score}</div>
          <div className="remaining-time">
            Time: {formatTime(remainingTime)}
          </div>
        </div>
        <div className="time-bar">
          <div
            className="time-remaining"
            style={{ width: `${(remainingTime / 120) * 100}%` }}
          />
        </div>
      </div>
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map(
              (
                gem: { gemValue: number; backgroundColor: string },
                colIndex: number
              ) => (
                <div
                  key={colIndex}
                  className={`gem gem-${gem.gemValue}`}
                  onClick={() => handleGemClick(rowIndex, colIndex)}
                >
                  <div
                    className="gem-background"
                    style={{
                      backgroundColor: gem.backgroundColor,
                      zIndex: -1,
                    }}
                  />
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
