import React, { useState, useEffect } from "react";

function RankingContainer() {
  const [topScores, setTopScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTopScores = () => {
    // 仮のランキングデータを取得するロジックをここに配置
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
    fetchTopScores();
  }, []);

  const top10 = topScores.slice(0, 10);
  const restOfTheRankings = topScores.slice(10, 20);

  return (
    <div className="ranking-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
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
  );
}

export default RankingContainer;
