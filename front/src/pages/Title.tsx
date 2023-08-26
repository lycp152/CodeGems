import React from "react";
import "../styles/Title.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useAuth } from "../context/AuthContext";
import { usePlay } from "../context/PlayContext";
import LongButton from "../components/LongButton";
import MainMenu from "../components/MainMenu";

interface TitleProps {
  toggleDetailView: () => void; // toggleDetailViewプロップを追加
}

export default function Title({ toggleDetailView }: TitleProps) {
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
            <MainMenu toggleDetailView={toggleDetailView} />
            <LongButton label="Play" onClick={handlePlay} />
          </>
        )}
      </div>
    </div>
  );
}
