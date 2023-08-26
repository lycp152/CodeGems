import React, { useState } from "react";
import "./styles/Home.css";
import Title from "./pages/Title";
import HowToPlay from "./pages/HowToPlay";
import SideMenuButton from "./components/SideMenuButton";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [isHowToPlayVisible, setIsHowToPlayVisible] = useState(false);
  const [isDetailView, setDetailView] = useState(false);

  return (
    <main className="main">
      <div className="main-contents">
        {isHowToPlayVisible ? <HowToPlay /> : <Title />}
        <SideMenuButton
          toggleHowToPlay={() => {
            setIsHowToPlayVisible(!isHowToPlayVisible);
            setDetailView(!isDetailView);
          }}
          isDetailView={isDetailView} // isDetailViewをPropsとして渡す
        />
      </div>
      <footer>
        <p>Copyright © 2023 🧙草咲か爺さんズ All Rights Reserved.</p>
      </footer>
    </main>
  );
};

export default Home;
