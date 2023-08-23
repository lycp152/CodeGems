import React from "react";
import "./styles/Home.css";
import Title from "./pages/Title";
import SideMenuButton from "./components/SideMenuButton";

export default function Home() {
  return (
    <main className="main">
      <div className="main-contents">
        <Title />
        <SideMenuButton />
      </div>
      <footer>
        <p>Copyright © 2023 🧙草咲か爺さんズ All Rights Reserved.</p>
      </footer>
    </main>
  );
}
