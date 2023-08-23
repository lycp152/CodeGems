import React, { useState } from "react";
import "../styles/Title.css";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Title() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="title-container">
      <h1 className="title">CodeGems</h1>
      <div className="button-container">
        {!isLoggedIn ? (
          <button onClick={handleLogin} className="title-button">
            <div className="button-content">
              <GitHubIcon style={{ fontSize: 35, marginRight: "10px" }} />
              Log in with GitHub
            </div>
          </button>
        ) : (
          <button className="title-button">Play</button>
        )}
      </div>
    </div>
  );
}
