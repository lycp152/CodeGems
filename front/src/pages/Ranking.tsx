import React from "react";
import RankingContainer from "../components/RankingContainer";
import "../styles/Ranking.css";

export default function Ranking() {
  return (
    <div className="ranking-container">
      <h1 className="title">Ranking</h1>
      <div className="main-container">
        <RankingContainer />
      </div>
    </div>
  );
}
