import React from "react";
// import "../styles/Result.css";

interface ResultProps {
  score: number;
}

export default function Result({ score }: ResultProps) {
  return (
    <div className="title-container">
      <h1 className="title">Result</h1>
      <div className="main-container">
        <p>Your Score: {score}</p>
      </div>
    </div>
  );
}
