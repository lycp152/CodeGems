import React, { useState, useEffect } from "react";
import "../styles/Result.css";
import LongButton from "../components/LongButton";

interface ResultProps {
  score: number;
  handleBack: () => void;
  handlePlay: () => void;
}

export default function Result({ score, handleBack, handlePlay }: ResultProps) {
  const [topScores, setTopScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 仮のランキングデータを取得する関数（実際にはAPIを使用することが一般的です）
  const fetchTopScores = () => {
    // ここで実際のデータを取得するロジックを追加
    // 例: fetch("/api/top-scores")
    // 例: axios.get("/api/top-scores")
    // 取得したデータはsetTopScoresでstateにセットする
    const mockData = [
      { username: "User1", score: 1000 },
      { username: "User2", score: 900 },
      { username: "User1", score: 1000 },
      { username: "User2", score: 900 },
      { username: "User1", score: 1000 },
      { username: "User2", score: 900 },
      { username: "User1", score: 1000 },
      { username: "User2", score: 900 },
      { username: "User1", score: 1000 },
      { username: "User2", score: 900 },
      { username: "User1", score: 1000 },
      { username: "User2", score: 900 },
      { username: "User1", score: 1000 },
      { username: "User2", score: 900 },
      { username: "User1", score: 1000 },
      { username: "User2", score: 900 },
      { username: "User1", score: 1000 },
      { username: "User2", score: 900 },
      { username: "User1", score: 1000 },
      { username: "User2", score: 900 },
      { username: "User1", score: 1000 },
      { username: "User2", score: 900 },
      // 他のユーザーのデータを追加
    ];
    setTopScores(mockData);
    setLoading(false);
  };

  useEffect(() => {
    // コンポーネントがマウントされたときにトップスコアを取得
    fetchTopScores();
  }, []);

  const top10 = topScores.slice(0, 10);
  const restOfTheRankings = topScores.slice(10, 20); // 11位から20位まで

  return (
    <div className="title-container">
      <h1 className="title">result</h1>
      <div className="main-container">
        <div className="score">score: {score}</div>
        <div className="ranking-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h2 className="ranking-subject">Top 20 Rankings</h2>
              <div className="rankings">
                <div className="top10">
                  <ol>
                    {top10.map((entry, index) => (
                      <li key={index}>
                        {entry.username}: {entry.score}
                      </li>
                    ))}
                  </ol>
                </div>
                {restOfTheRankings.length > 0 && (
                  <div className="top11-20">
                    <ol start={11}>
                      {restOfTheRankings.map((entry, index) => (
                        <li key={index}>
                          {entry.username}: {entry.score}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="result-button-container">
          <div className="button-wrapper">
            <LongButton label="Share" />
            <LongButton label="Retry" onClick={handlePlay} />
          </div>
        </div>
      </div>
    </div>
  );
}
