import React from "react";
import "../styles/Title.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useAuth } from "../context/AuthContext";
import LongButton from "../components/LongButton";
import MainMenu from "../components/MainMenu";

interface TitleProps {
  toggleDetailView: () => void;
  handlePlay: () => void; // handlePlay プロップを追加
}

export default function Title({ toggleDetailView, handlePlay }: TitleProps) {
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
            <MainMenu toggleDetailView={toggleDetailView} />
            <LongButton label="Play" onClick={handlePlay} />
          </>
        )}
      </div>
    </div>
  );
}
