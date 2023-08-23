import React, { useState } from "react";
import "../styles/Title.css";

export default function Title() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態を管理するステート

  const handleLogin = () => {
    // GitHubのログイン処理を実行した後にログイン状態を更新する
    setIsLoggedIn(true);
  };

  return (
    <div className="title-container">
      <h1 className="title">CodeGems</h1>
      <div className="button-container">
        {!isLoggedIn ? (
          <button onClick={handleLogin} className="title-button">
            Log in with GitHub
          </button>
        ) : (
          <button className="title-button">Play</button>
        )}
      </div>
    </div>
  );
}
