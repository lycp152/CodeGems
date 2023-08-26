import React from "react";
import "../styles/Title.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useAuth } from "../context/AuthContext";
import LongButton from "../components/LongButton";
import MainMenu from "../components/MainMenu";

interface TitleProps {
  toggleHowToPlay: () => void;
  toggleRewardNFT: () => void;
  toggleGemSkin: () => void;
  toggleRanking: () => void;
  handlePlay: () => void;
}

const Title: React.FC<TitleProps> = ({
  toggleRewardNFT,
  toggleGemSkin,
  toggleRanking,
  handlePlay,
}) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="title-container">
      <h1 className="title">CodeGems</h1>
      <div className="button-container">
        {!isLoggedIn ? (
          <LongButton
            icon={<GitHubIcon style={{ fontSize: 35, marginRight: "10px" }} />}
            label="Log in with GitHub"
            onClick={handleLogin}
          />
        ) : (
          <>
            <MainMenu
              toggleRewardNFT={toggleRewardNFT}
              toggleGemSkin={toggleGemSkin}
              toggleRanking={toggleRanking}
            />
            <LongButton label="Play" onClick={handlePlay} />
          </>
        )}
      </div>
    </div>
  );
};

export default Title;
