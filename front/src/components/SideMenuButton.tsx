import React, { useState } from "react";
import IconButton from "./IconButton";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LogoutIcon from "@mui/icons-material/Logout";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../context/AuthContext";
import { usePlay } from "../context/PlayContext";
import "../styles/SideMenuButton.css";

export default function SideMenuButton() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const { isPlaying } = usePlay();

  const isDetailView = false;

  const [isSoundOn, setIsSoundOn] = useState(true);
  const [hintCount, setHintCount] = useState(4); // 初期値は4

  const handleSoundToggle = () => {
    setIsSoundOn((prevState) => !prevState);
  };

  const handleHintButtonClick = () => {
    if (hintCount > 0) {
      setHintCount((prevCount) => prevCount - 1); // カウントを減少
    }
  };

  return (
    <div className="side-buttons">
      {!isDetailView && (
        <>
          {isPlaying ? (
            <IconButton
              onClick={handleHintButtonClick}
              icon={
                <div>
                  <LightbulbIcon style={{ fontSize: 80 }} />
                  <div className="hint-count">{hintCount}</div>{" "}
                  {/* カウントを表示 */}
                </div>
              }
              label="hint"
            />
          ) : isLoggedIn ? (
            <IconButton
              onClick={handleLogout}
              icon={<LogoutIcon style={{ fontSize: 80 }} />}
              label="logOut"
            />
          ) : null}
          <IconButton
            onClick={handleSoundToggle}
            icon={
              isSoundOn ? (
                <VolumeUpIcon style={{ fontSize: 80 }} />
              ) : (
                <VolumeOffIcon style={{ fontSize: 80 }} />
              )
            } // 音声アイコンの切り替え
            label="sound"
          />
          <IconButton
            icon={<QuestionMarkIcon style={{ fontSize: 80 }} />}
            label="howToPlay"
          />
        </>
      )}
      {isDetailView && (
        <IconButton
          icon={<ArrowBackIcon style={{ fontSize: 80 }} />}
          label="backToTitle"
        />
      )}
    </div>
  );
}
