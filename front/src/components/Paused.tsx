import React, { useState, useEffect } from "react";

const Paused: React.FC = () => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    // データを取得するエンドポイントのURL
    const textEndpoint = "http://localhost:3005/api/v1/tips";

    // データをフェッチする関数
    const fetchText = async () => {
      try {
        const response = await fetch(textEndpoint);

        if (!response.ok) {
          throw new Error("データの取得に失敗しました");
        }

        const data = await response.text();
        setText(data);
      } catch (error) {
        console.error("データの取得エラー:", error);
      }
    };

    // データをフェッチする関数を呼び出す
    fetchText();
  }, []); // 空の依存リストを指定して初回レンダリング時にのみ実行

  return (
    <div className="paused-container">
      <h2>Tips</h2>
      <p>{text}</p>
    </div>
  );
};

export default Paused;
