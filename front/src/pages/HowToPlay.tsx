import React from "react";
import howToPlayImage from "../assets/images/howToPlay.png";
import oddsImage from "../assets/images/odds.png";
import "../styles/HowToPlay.css";

export default function HowToPlay() {
  return (
    <div className="title-container">
      <h1 className="title">How to Play</h1>
      <div className="main-container">
        <div className="image-description-container">
          <img
            className="how-to-play-image"
            src={howToPlayImage}
            alt="How to Play"
          />
          <p className="image-description">
            縦・横に3つ以上同じジェムを揃えて、ドラッグして交換
            <br />
            3つ以上同じジェムを横か縦に並べると、
            <br />
            それらのジェムが消えて得点が加算
            <br />
            連鎖でより多くのアイテムを同時にマッチさせると高得点
          </p>
        </div>
        <div className="image-description-container">
          <img className="odds-image" src={oddsImage} alt="Odds" />
          <p className="image-description">
            ジェムを消した場所の草の生え方によって、
            <br />
            得点の倍率が変わります
          </p>
        </div>
      </div>
    </div>
  );
}
