import React, { useState, useEffect } from "react";
import "../styles/Play.css";

const numRows = 8;
const numCols = 7;
const numGemTypes = 6;

interface Gem {
  gemValue: number;
  backgroundColor: string;
}

const gemBackgroundColors: Record<string, number> = {
  "#12151A": 1,
  "#0E351F": 2,
  "#0D5C25": 3,
  "#249932": 4,
  "#34CE42": 5,
};

function generateRandomGemValue(): number {
  return Math.floor(Math.random() * numGemTypes);
}

function generateRandomBackgroundColor(): string {
  const backgroundColors = Object.keys(gemBackgroundColors);
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randomIndex];
}

interface PlayProps {
  remainingTime: number;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const Play: React.FC<PlayProps> = ({
  remainingTime,
  setRemainingTime,
  score,
  setScore,
}) => {
  const [grid, setGrid] = useState<Gem[][]>([]);

  useEffect(() => {
    const newGrid: Gem[][] = [];
    for (let row = 0; row < numRows; row++) {
      const newRow: Gem[] = [];
      for (let col = 0; col < numCols; col++) {
        const gemValue = generateRandomGemValue();
        const backgroundColor = generateRandomBackgroundColor();
        newRow.push({ gemValue, backgroundColor });
      }
      newGrid.push(newRow);
    }
    setGrid(newGrid);

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [setRemainingTime]);

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  function handleGemClick(row: number, col: number): void {
    const gem = grid[row][col];
    const backgroundColor = Object.keys(gemBackgroundColors).find(
      (color) => gemBackgroundColors[color] === gem.gemValue
    );
    if (backgroundColor) {
      const multiplier = gemBackgroundColors[backgroundColor];
      setScore((prevScore) => prevScore + multiplier);

      const updatedGrid = grid.map((gridRow, rowIndex) =>
        rowIndex === row
          ? gridRow.map((gem, colIndex) =>
              colIndex === col ? { ...gem, gemValue: -1 } : gem
            )
          : gridRow
      );
      setGrid(updatedGrid);
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
            {row.map((gem, colIndex) => (
              <div
                key={colIndex}
                className={`gem gem-${gem.gemValue}`}
                onClick={() => handleGemClick(rowIndex, colIndex)}
              >
                <div
                  className="gem-background"
                  style={{ backgroundColor: gem.backgroundColor, zIndex: -1 }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Play;
