import React from "react";
import { useState } from "react";
import { json } from "stream/consumers";
// import "../styles/Ranking.css";

export default function Ranking() {

  const[ name, setName] = useState("");

  fetch("https://green.adam.ne.jp/roomazi/cgi-bin/randomname.cgi")
  .then((res) => res.json)
  .then((json) => {
    console.log(json)
    setName(json.name)
  });
  

  return (
    <div className="title-container">
      <h1 className="title">ranking</h1>
      <div className="main-container"></div>
      <li>
        {name}
      </li>
    </div>
  );
}
