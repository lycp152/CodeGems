import React from "react";
import "../styles/Title.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useAuth } from "../context/AuthContext";
import { usePlay } from "../context/PlayContext";
import LongButton from "../components/LongButton";
import IconButton from "../components/IconButton";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DiamondIcon from "@mui/icons-material/Diamond";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function Title() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const { setIsPlaying } = usePlay();
  const handlePlay = () => {
    setIsPlaying(true);
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
            <div className="main-menu">
              <IconButton
                icon={<MilitaryTechIcon style={{ fontSize: 80 }} />}
                label="rewardNFT"
              />
              <IconButton
                icon={<DiamondIcon style={{ fontSize: 80 }} />}
                label="gemSkin"
              />
              <IconButton
                icon={<EmojiEventsIcon style={{ fontSize: 80 }} />}
                label="ranking"
              />
            </div>
            <LongButton label="Play" onClick={handlePlay} />
          </>
        )}
      </div>
    </div>
  );
}
