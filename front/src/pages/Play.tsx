import React, { useState, useEffect } from "react";
import "../styles/Play.css";

// グリッドの行数、列数、ジェムの種類数を定義
const numRows = 8;
const numCols = 7;
const numGemTypes = 6;

// ジェムの型を定義
interface Gem {
  gemValue: number;
  backgroundColor: string;
}

// ジェムの背景色とジェムの値のマッピング
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
// ゲームコンポーネント
const Play: React.FC<PlayProps> = ({
  remainingTime,
  setRemainingTime,
  score,
  setScore,
}) => {
  // グリッドと選択されたジェムの状態を管理するState
  const [grid, setGrid] = useState<Gem[][]>([]);
  const [selectedGem, setSelectedGem] = useState<{
    row: number;
    col: number;
  } | null>(null);

  // コンポーネントの初回レンダリング時およびremainingTimeが変更されるたびに実行されるEffect
  useEffect(() => {
    // グリッドを初期化
    const newGrid: Gem[][] = [];
    for (let row = 0; row < numRows; row++) {
      const newRow: Gem[] = [];
      for (let col = 0; col < numCols; col++) {
        // 隣接するジェムの値を除外してランダムなジェムを生成
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
    // グリッドを更新
    setGrid(newGrid);

    // 1秒ごとにremainingTimeを減少させるタイマーを設定
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    // コンポーネントのアンマウント時にタイマーをクリア
    return () => {
      clearInterval(timer);
    };
  }, [setRemainingTime]); // setRemainingTimeが変更されるとEffectが実行される

  // 残り時間を分:秒のフォーマットに変換する関数
  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  // ジェムがクリックされたときの処理
  function handleGemClick(row: number, col: number): void {
    if (selectedGem === null) {
      setSelectedGem({ row, col });
    } else {
      // クリックされたジェムが選択されたジェムに隣接しているかを確認
      const isAdjacent =
        (Math.abs(selectedGem.row - row) === 1 && selectedGem.col === col) ||
        (Math.abs(selectedGem.col - col) === 1 && selectedGem.row === row);

      if (isAdjacent) {
        // ジェムを交換してグリッドを更新
        const updatedGrid = grid.map((gridRow, rowIndex) =>
          gridRow.map((gem, colIndex) => {
            if (
              (rowIndex === selectedGem.row && colIndex === selectedGem.col) ||
              (rowIndex === row && colIndex === col)
            ) {
              // 選択されたジェムとクリックされたジェムのプロパティをマージ
              return Object.assign(
                {},
                grid[selectedGem.row][selectedGem.col],
                grid[row][col]
              );
            }
            return gem;
          })
        );

        setGrid(updatedGrid); // グリッドを更新
        setSelectedGem(null); // 選択されたジェムをリセット
      } else {
        setSelectedGem({ row, col });
      }
    }
  }

  return (
    <div className="play-container">
      <div className="game-info">
        <div className="score-time-container">
          <div className="score">スコア: {score}</div>
          <div className="remaining-time">
            時間: {formatTime(remainingTime)}
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
