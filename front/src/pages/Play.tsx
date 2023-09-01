import React, { useState, useEffect } from "react";
import "../styles/Play.css";
import GemGrid from "../components/GemGrid";

// グリッドの行数、列数、ジェムの種類数を定義
const numRows = 8; // グリッドの行数
const numCols = 7; // グリッドの列数
const numGemTypes = 6; // ジェムの種類数

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
  const [grid, setGrid] = useState<Gem[][]>([]); // グリッドの状態
  const [selectedGem, setSelectedGem] = useState<{
    row: number;
    col: number;
  } | null>(null); // 選択されたジェムの位置

  // コンポーネントの初回レンダリング時およびremainingTimeが変更されるたびに実行されるEffect
  useEffect(() => {
    // グリッドを初期化
    function initializeGrid(): Gem[][] {
      const newGrid: Gem[][] = [];
      for (let row = 0; row < numRows; row++) {
        const newRow: Gem[] = [];
        for (let col = 0; col < numCols; col++) {
          // 隣接するジェムの値を除外してランダムなジェムを生成
          const excludedValues: number[] = [];
          if (row >= 2) {
            excludedValues.push(
              ...newGrid.slice(row - 2, row).map((r) => r[col].gemValue)
            );
          }
          if (col >= 2) {
            excludedValues.push(
              ...newRow.slice(col - 2, col).map((gem) => gem.gemValue)
            );
          }
          const gemValue = generateRandomGemValue(excludedValues);
          const backgroundColor = generateRandomBackgroundColor();
          newRow.push({ gemValue, backgroundColor });
        }
        newGrid.push(newRow);
      }
      return newGrid;
    }

    const newGrid = initializeGrid();
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

  // setRemainingTimeが変更されるとEffectが実行される
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
        Math.abs(selectedGem.row - row) + Math.abs(selectedGem.col - col) === 1;

      if (isAdjacent) {
        const selectedGemValue =
          grid[selectedGem.row][selectedGem.col].gemValue;
        const clickedGemValue = grid[row][col].gemValue;

        // 選択されたジェムとクリックされたジェムの値（gemValue）と位置を入れ替えてグリッドを更新
        const updatedGrid = grid.map((gridRow, rowIndex) =>
          gridRow.map((gem, colIndex) => {
            if (rowIndex === selectedGem.row && colIndex === selectedGem.col) {
              // クリックされたジェムの値（gemValue）と位置を選択されたジェムに設定
              return { ...gem, gemValue: clickedGemValue };
            } else if (rowIndex === row && colIndex === col) {
              // 選択されたジェムの値（gemValue）と位置をクリックされたジェムに設定
              return { ...gem, gemValue: selectedGemValue };
            }
            return gem;
          })
        );

        // グリッドを更新した後、連続するジェムを消す処理を追加
        const updatedGridWithMatches = removeMatches(updatedGrid);

        // 得点を計算して加算
        const newScore = updatedGridWithMatches.reduce(
          (acc, row) =>
            acc +
            row.reduce(
              (rowAcc, gem) =>
                // ジェムが消えた場合、背景色に応じて得点を加算
                gem.gemValue === -1
                  ? rowAcc + getScoreByBackgroundColor(gem.backgroundColor)
                  : rowAcc,
              0
            ),
          0
        );

        setGrid(updatedGridWithMatches); // グリッドを更新
        setScore(newScore); // 得点を更新
        setSelectedGem(null); // 選択されたジェムをリセット
      } else {
        setSelectedGem({ row, col });
      }
    }
  }

  // 連続するジェムを消す関数
  function removeMatches(currentGrid: Gem[][]): Gem[][] {
    const newGrid = currentGrid.map((row) => [...row]);

    for (let col = 0; col < numCols; col++) {
      let emptyRowCounter = 0; // ジェムが消えた回数をカウント

      // 上から下に移動させるために逆順でループ
      for (let row = numRows - 1; row >= 0; row--) {
        const gemValue = newGrid[row][col].gemValue;

        if (gemValue === -1) {
          emptyRowCounter++;
        } else if (emptyRowCounter > 0) {
          // ジェムが消えた場合、上に詰まっているジェムを下に移動
          newGrid[row + emptyRowCounter][col] = { ...newGrid[row][col] };
          newGrid[row][col].gemValue = -1; // 上に詰まった位置を空にする
        }
      }

      // 横方向と縦方向のマッチングをチェックし、3つ以上の連続したジェムを消す処理

      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const gemValue = newGrid[row][col].gemValue;

          // 横方向に連続するジェムをチェック
          let horizontalMatches = 1;
          for (let i = col + 1; i < numCols; i++) {
            if (newGrid[row][i].gemValue === gemValue) {
              horizontalMatches++;
            } else {
              break;
            }
          }

          // 縦方向に連続するジェムをチェック
          let verticalMatches = 1;
          for (let i = row + 1; i < numRows; i++) {
            if (newGrid[i][col].gemValue === gemValue) {
              verticalMatches++;
            } else {
              break;
            }
          }

          // 3つ以上の連続したジェムがあれば消す
          if (horizontalMatches >= 3) {
            for (let i = col; i < col + horizontalMatches; i++) {
              newGrid[row][i].gemValue = -1; // ジェムの値をリセット
            }
          }
          if (verticalMatches >= 3) {
            for (let i = row; i < row + verticalMatches; i++) {
              newGrid[i][col].gemValue = -1; // ジェムの値をリセット
            }
          }
        }
      }
    }

    return newGrid;
  }

  function getScoreByBackgroundColor(backgroundColor: string): number {
    switch (backgroundColor) {
      case "#12151A":
        return 10;
      case "#0E351F":
        return 20;
      case "#0D5C25":
        return 30;
      case "#249932":
        return 40;
      case "#34CE42":
        return 50;
      default:
        return 0;
    }
  }

  return (
    <div className="play-container">
      <div className="game-info">
        <div className="score-time-container">
          <div className="score">score: {score}</div>
          <div className="remaining-time">
            time: {formatTime(remainingTime)}
          </div>
        </div>
        <div className="time-bar">
          <div
            className="time-remaining"
            style={{ width: `${(remainingTime / 120) * 100}%` }}
          />
        </div>
      </div>
      <GemGrid
        grid={grid}
        selectedGem={selectedGem}
        onGemClick={(row, col) => handleGemClick(row, col)}
      />
    </div>
  );
};

export default Play;
