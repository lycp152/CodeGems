import React, { useState } from "react";
import {
  Lightbulb as LightbulbIcon,
  Logout as LogoutIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  QuestionMark as QuestionMarkIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import IconButton from "./IconButton";
import "../styles/SideMenuButton.css";
import { signOut, getAuth } from "firebase/auth";

interface SideMenuButtonProps {
  toggleHowToPlay: () => void;
  toggleBackToTitle: () => void;
  toggleBackToPlay: () => void;
  isDetailView: boolean;
  isPlaying: boolean;
  hintCount: number;
  setHintCount: React.Dispatch<React.SetStateAction<number>>; // 追加
  isGamePaused: boolean;
  setIsGamePaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenuButton: React.FC<SideMenuButtonProps> = ({
  toggleHowToPlay,
  toggleBackToTitle,
  toggleBackToPlay,
  isDetailView,
  isPlaying,
  hintCount,
  setHintCount,
  isGamePaused,
  setIsGamePaused,
}) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isSoundOn, setIsSoundOn] = useState(true);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth).then(() => {
      setIsLoggedIn(false);
    });
  };

  const handleSoundToggle = () => setIsSoundOn(!isSoundOn);

  const handleHintButtonClick = () => {
    if (hintCount > 0) {
      setHintCount((prevCount) => prevCount - 1);
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
                  <div className="hint-count">{hintCount}</div>
                </div>
              }
              label="hint"
            />
          ) : (
            isLoggedIn && (
              <IconButton
                onClick={handleLogout}
                icon={<LogoutIcon style={{ fontSize: 80 }} />}
                label="logOut"
              />
            )
          )}
          <IconButton
            onClick={handleSoundToggle}
            icon={
              isSoundOn ? (
                <VolumeUpIcon style={{ fontSize: 80 }} />
              ) : (
                <VolumeOffIcon style={{ fontSize: 80 }} />
              )
            }
            label="sound"
          />
          <IconButton
            onClick={toggleHowToPlay}
            icon={<QuestionMarkIcon style={{ fontSize: 80 }} />}
            label="howToPlay"
          />
        </>
      )}
      {isDetailView && (
        // プレイ中の場合、backToPlay ボタンを表示/プレイ中でない場合、backToTitle ボタンを表示
        <IconButton
          onClick={isPlaying ? toggleBackToPlay : toggleBackToTitle}
          icon={<ArrowBackIcon style={{ fontSize: 80 }} />}
          label={isPlaying ? "backToPlay" : "backToTitle"}
        />
      )}
    </div>
  );
};

export default SideMenuButton;
