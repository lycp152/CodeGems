import React, { useState, useEffect } from "react";
import "../styles/Play.css";
import GemGrid from "../components/GemGrid";
import GameInfo from "../components/GameInfo";
import {
  numRows,
  numCols,
  numGemTypes,
  gemBackgroundColors,
  MIN_MATCH_COUNT,
} from "../components/constants";

// ジェムの型を定義
interface Gem {
  gemValue: number;
  backgroundColor: string;
}

// 新しいランダムなジェムの値を生成する関数
function generateRandomGemValue(excludedValues: number[]): number {
  let newValue;
  do {
    newValue = Math.floor(Math.random() * numGemTypes);
  } while (excludedValues.includes(newValue));
  return newValue;
}

// 新しいランダムな背景色を生成する関数
function generateRandomBackgroundColor(): string {
  const backgroundColors = Object.keys(gemBackgroundColors);
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randomIndex];
}

// プレイコンポーネントのプロパティ
interface PlayProps {
  remainingTime: number; // 残り時間
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>; // 残り時間を設定する関数
  score: number; // 得点
  setScore: React.Dispatch<React.SetStateAction<number>>; // 得点を設定する関数
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
    // グリッドを初期化する関数
    function initializeGrid(): Gem[][] {
      const newGrid: Gem[][] = [];
      for (let row = 0; row < numRows; row++) {
        const newRow: Gem[] = [];
        for (let col = 0; col < numCols; col++) {
          // 隣接するジェムの値を除外してランダムなジェムを生成
          const excludedValues: number[] = [];
          if (row >= 2) {
            // 上方向に2つの行をチェック
            excludedValues.push(
              ...newGrid.slice(row - 2, row).map((r) => r[col].gemValue)
            );
          }
          if (col >= 2) {
            // 左方向に2つの列をチェック
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

  // 連続するジェムを消す関数
  function removeMatchesAndCascade(currentGrid: Gem[][]): void {
    const newGrid = currentGrid.map((row) => [...row]);
    const gemClasses: string[] = []; // ジェムのクラス名を管理する変数

    // マッチングをチェックしてジェムを消す
    function checkAndRemoveMatches() {
      checkHorizontalMatches();
      checkVerticalMatches();
    }

    // 横方向のマッチングをチェックし、3つ以上の連続したジェムを消す処理
    function checkHorizontalMatches() {
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const gemValue = newGrid[row][col].gemValue;
          let horizontalMatches = 1;

          for (let i = col + 1; i < numCols; i++) {
            if (newGrid[row][i].gemValue === gemValue) {
              horizontalMatches++;
            } else {
              break;
            }
          }

          if (horizontalMatches >= MIN_MATCH_COUNT) {
            removeHorizontalMatches(row, col, horizontalMatches);
          }
        }
      }
    }

    // 縦方向のマッチングをチェックし、3つ以上の連続したジェムを消す処理
    function checkVerticalMatches() {
      for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows; row++) {
          const gemValue = newGrid[row][col].gemValue;
          let verticalMatches = 1;

          for (let i = row + 1; i < numRows; i++) {
            if (newGrid[i][col].gemValue === gemValue) {
              verticalMatches++;
            } else {
              break;
            }
          }

          if (verticalMatches >= MIN_MATCH_COUNT) {
            removeVerticalMatches(row, col, verticalMatches);
          }
        }
      }
    }

    // 連続したジェムを消す処理
    function removeHorizontalMatches(
      row: number,
      col: number,
      matches: number
    ) {
      gemClasses.push("blinking");
      for (let i = col; i < col + matches; i++) {
        newGrid[row][i].gemValue = -1;
      }
    }

    // 連続したジェムを消す処理
    function removeVerticalMatches(row: number, col: number, matches: number) {
      gemClasses.push("blinking");
      for (let i = row; i < row + matches; i++) {
        newGrid[i][col].gemValue = -1;
      }
    }

    // ジェムが消えた直後に上にあるジェムを下に移動する処理
    function cascadeGems() {
      for (let col = 0; col < numCols; col++) {
        let newRow = numRows - 1;
        for (let row = numRows - 1; row >= 0; row--) {
          if (newGrid[row][col].gemValue !== -1) {
            newGrid[newRow][col].gemValue = newGrid[row][col].gemValue;
            newRow--;
          }
        }
        for (let i = newRow; i >= 0; i--) {
          newGrid[i][col].gemValue = -1;
        }
      }
    }

    // 得点を計算して加算
    function calculateAndSetScore() {
      const newScore = newGrid.reduce(
        (acc, row) =>
          acc +
          row.reduce(
            (rowAcc, gem) =>
              gem.gemValue === -1
                ? rowAcc + getScoreByBackgroundColor(gem.backgroundColor)
                : rowAcc,
            0
          ),
        0
      );

      setGrid(newGrid);
      setScore((prevScore) => prevScore + newScore);
    }

    // 新しいランダムなジェムを生成して埋める
    function fillEmptySpaces() {
      for (let col = 0; col < numCols; col++) {
        let emptySpaces = 0;
        for (let row = numRows - 1; row >= 0; row--) {
          if (newGrid[row][col].gemValue === -1) {
            const randomGemValue = getRandomGemValue();
            const initialBackgroundColor = newGrid[row][col].backgroundColor;
            const newGem = {
              gemValue: randomGemValue,
              backgroundColor: initialBackgroundColor,
            };
            newGrid[row][col] = newGem;
            emptySpaces++;
          } else if (emptySpaces > 0) {
            const currentGem = newGrid[row][col];
            newGrid[row + emptySpaces][col] = currentGem;
            newGrid[row][col] = { gemValue: -1, backgroundColor: "" };
          }
        }
      }
    }

    // 連続しているか再度判定
    function checkForAndRemoveMatchesRecursively() {
      if (checkForMatches(newGrid)) {
        removeMatchesAndCascade(newGrid);
      } else {
        setSelectedGem(null);
      }
    }

    // マッチングをチェックしてジェムを消す
    checkAndRemoveMatches();
    // ジェムが消えた直後に上にあるジェムを下に移動
    cascadeGems();
    // 得点を計算して加算
    calculateAndSetScore();
    // 新しいランダムなジェムを生成して埋める
    fillEmptySpaces();
    // 連続しているか再度判定
    checkForAndRemoveMatchesRecursively();
  }

  // ランダムなジェムの値を生成する関数
  function getRandomGemValue(): number {
    return Math.floor(Math.random() * 6); // 0 から 5 のランダムな整数
  }

  // ジェムの連続判定を行う関数
  function checkForMatches(gridToCheck: Gem[][]): boolean {
    // 横方向のマッチングをチェック
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols - 2; col++) {
        if (
          gridToCheck[row][col].gemValue !== -1 &&
          gridToCheck[row][col].gemValue ===
            gridToCheck[row][col + 1].gemValue &&
          gridToCheck[row][col].gemValue === gridToCheck[row][col + 2].gemValue
        ) {
          return true; // 3つ以上の連続が見つかったらtrueを返す
        }
      }
    }

    // 縦方向のマッチングをチェック
    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numRows - 2; row++) {
        if (
          gridToCheck[row][col].gemValue !== -1 &&
          gridToCheck[row][col].gemValue ===
            gridToCheck[row + 1][col].gemValue &&
          gridToCheck[row][col].gemValue === gridToCheck[row + 2][col].gemValue
        ) {
          return true; // 3つ以上の連続が見つかったらtrueを返す
        }
      }
    }

    return false; // 連続が見つからなかったらfalseを返す
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
        removeMatchesAndCascade(updatedGrid);
      }

      setSelectedGem(null);
    }
  }

  // 背景色に基づいて得点を計算する関数
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
      {/* ゲーム情報コンポーネント */}
      <GameInfo score={score} remainingTime={remainingTime} />
      {/* ジェムグリッドコンポーネント */}
      <GemGrid
        grid={grid}
        selectedGem={selectedGem}
        onGemClick={(row, col) => handleGemClick(row, col)}
      />
    </div>
  );
};

export default Play;
