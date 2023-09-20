import React from "react";
import RankingContainer from "../components/RankingContainer";
import "../styles/Ranking.css";

export default function Ranking() {
  return (
    <div className="title-container">
      <h1 className="title">ranking</h1>

      <div className="main-container">
        <RankingContainer />
      </div>
    </div>
  );
}
