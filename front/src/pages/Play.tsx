import React, { useState, useEffect } from "react";
import "../styles/Play.css";
import GemGrid from "../components/GemGrid";
import GameInfo from "../components/GameInfo";
import PlayMenu from "../components/PlayMenu";
import Paused from "../components/Paused";
import {
  numRows,
  numCols,
  numGemTypes,
  gemBackgroundColors,
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
  toggleBackToTitle: () => void;
  handleTimeUp: () => void;
  isGamePaused: boolean;
  setIsGamePaused: React.Dispatch<React.SetStateAction<boolean>>;
}

// ゲームコンポーネント
const Play: React.FC<PlayProps> = ({
  remainingTime,
  setRemainingTime,
  score,
  setScore,
  toggleBackToTitle,
  handleTimeUp,
  isGamePaused,
  setIsGamePaused,
}) => {
  // グリッドと選択されたジェムの状態を管理するState
  const [isPlaying, setIsPlaying] = useState(false);
  const [grid, setGrid] = useState<Gem[][]>(() => initializeGrid()); // グリッドの状態
  const [selectedGem, setSelectedGem] = useState<{
    row: number;
    col: number;
  } | null>(null); // 選択されたジェムの位置

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

  // プレイメニューコンポーネントがポーズボタンをクリックしたときの処理
  const togglePause = () => {
    setIsGamePaused((prevIsGamePaused) => !prevIsGamePaused);
  };

  // コンポーネントの初回レンダリング時およびremainingTimeが変更されるたびに実行されるEffect
  useEffect(() => {
    // コンポーネントが初回レンダリング時にのみ初期化
    if (!isGamePaused && grid.flat().every((gem) => gem.gemValue === -1)) {
      const newGrid = initializeGrid();
      // グリッドを更新
      setGrid(newGrid);
    }

    // 1秒ごとにremainingTimeを減少させるタイマーを設定
    const timer = setInterval(() => {
      if (!isGamePaused) {
        // ゲームが一時停止されていない場合のみ時間を減少させる
        setRemainingTime((prevTime) =>
          prevTime > 0 ? prevTime - 1 : prevTime
        );
      }
    }, 1000);

    if (remainingTime === 0) {
      handleTimeUp(); // タイマーがゼロになったら handleTimeUp を呼び出す
    }

    // コンポーネントのアンマウント時にタイマーをクリア
    return () => {
      clearInterval(timer);
    };
  }, [isGamePaused, setRemainingTime, grid, remainingTime, handleTimeUp]);

  // 連続するジェムを消す関数
  function removeMatchesAndCascade(currentGrid: Gem[][]): void {
    const newGrid = currentGrid.map((row) => [...row]);
    const gemClasses: string[] = []; // ジェムのクラス名を管理する変数

    // マッチングをチェックしてジェムを消す
    function checkAndRemoveMatches() {
      checkMatches("horizontal");
      checkMatches("vertical");
    }
    // マッチングをチェックする関数
    function checkMatches(direction: "horizontal" | "vertical") {
      const maxRows = direction === "horizontal" ? numRows : numCols;
      const maxCols = direction === "horizontal" ? numCols : numRows;

      for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < maxCols - 2; j++) {
          const firstGem =
            direction === "horizontal" ? newGrid[i][j] : newGrid[j][i];
          const secondGem =
            direction === "horizontal" ? newGrid[i][j + 1] : newGrid[j + 1][i];
          const thirdGem =
            direction === "horizontal" ? newGrid[i][j + 2] : newGrid[j + 2][i];

          if (
            firstGem.gemValue !== -1 &&
            firstGem.gemValue === secondGem.gemValue &&
            firstGem.gemValue === thirdGem.gemValue
          ) {
            removeMatches(i, j, 3, direction);
          }
        }
      }
    }

    // 連続したジェムを消す処理
    function removeMatches(
      row: number,
      col: number,
      matches: number,
      direction: "horizontal" | "vertical"
    ) {
      gemClasses.push("blinking");
      for (let i = 0; i < matches; i++) {
        if (direction === "horizontal") {
          newGrid[row][col + i].gemValue = -1;
        } else {
          newGrid[row + i][col].gemValue = -1;
        }
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
    if (!isGamePaused) {
      // ゲームが一時停止されていない場合のみ処理を実行
      if (selectedGem === null) {
        setSelectedGem({ row, col });
      } else {
        // クリックされたジェムが選択されたジェムに隣接しているかを確認
        const isAdjacent =
          Math.abs(selectedGem.row - row) + Math.abs(selectedGem.col - col) ===
          1;

        if (isAdjacent) {
          const selectedGemValue =
            grid[selectedGem.row][selectedGem.col].gemValue;
          const clickedGemValue = grid[row][col].gemValue;

          // 選択されたジェムとクリックされたジェムの値（gemValue）と位置を入れ替えてグリッドを更新
          const updatedGrid = grid.map((gridRow, rowIndex) =>
            gridRow.map((gem, colIndex) => {
              if (
                rowIndex === selectedGem.row &&
                colIndex === selectedGem.col
              ) {
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
      {isGamePaused ? (
        // isGamePausedがtrueの場合、Pausedを表示
        <Paused />
      ) : (
        // isGamePausedがfalseの場合、通常のGemGridを表示
        /* ジェムグリッドコンポーネント */
        <GemGrid
          grid={grid}
          selectedGem={selectedGem}
          onGemClick={(row, col) => handleGemClick(row, col)}
        />
      )}
      {/* プレイメニューコンポーネント */}
      <PlayMenu
        togglePause={togglePause}
        toggleBackToTitle={toggleBackToTitle}
        isGamePaused={isGamePaused}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default Play;
