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

function generateRandomGemValue(excludedValues: number[]): number {
  let newValue;
  do {
    newValue = Math.floor(Math.random() * numGemTypes);
  } while (excludedValues.includes(newValue));
  return newValue;
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
  const [selectedGem, setSelectedGem] = useState<{
    row: number;
    col: number;
  } | null>(null);

  useEffect(() => {
    const newGrid: Gem[][] = [];
    for (let row = 0; row < numRows; row++) {
      const newRow: Gem[] = [];
      for (let col = 0; col < numCols; col++) {
        const excludedValues: number[] = [];
        if (row >= 2) {
          const previousGems = [newGrid[row - 1][col], newGrid[row - 2][col]];
          excludedValues.push(...previousGems.map((gem) => gem.gemValue));
        }
        if (col >= 2) {
          const previousGems = [newRow[col - 1], newRow[col - 2]];
          excludedValues.push(...previousGems.map((gem) => gem.gemValue));
        }
        const gemValue = generateRandomGemValue(excludedValues);
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
    if (selectedGem === null) {
      setSelectedGem({ row, col });
    } else {
      // Check if clicked gem is adjacent to the selected gem
      const isAdjacent =
        (Math.abs(selectedGem.row - row) === 1 && selectedGem.col === col) ||
        (Math.abs(selectedGem.col - col) === 1 && selectedGem.row === row);

      if (isAdjacent) {
        // Swap the gems
        const updatedGrid = grid.map((gridRow, rowIndex) =>
          gridRow.map((gem, colIndex) => {
            if (
              (rowIndex === selectedGem.row && colIndex === selectedGem.col) ||
              (rowIndex === row && colIndex === col)
            ) {
              return {
                ...grid[selectedGem.row][selectedGem.col],
                backgroundColor: grid[row][col].backgroundColor,
              };
            }
            return gem;
          })
        );
        setGrid(updatedGrid);
        setSelectedGem(null);
      } else {
        setSelectedGem({ row, col });
      }
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
                style={{ position: "relative" }}
              >
                <div
                  className="gem-background"
                  style={{ backgroundColor: gem.backgroundColor, zIndex: -1 }}
                />
                {selectedGem?.row === rowIndex &&
                  selectedGem?.col === colIndex && (
                    <div className="gem-cursor" />
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Play;
