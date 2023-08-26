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

interface SideMenuButtonProps {
  toggleHowToPlay: () => void;
  toggleBackToTitle: () => void;
  isDetailView: boolean;
  isPlaying: boolean;
}

const SideMenuButton: React.FC<SideMenuButtonProps> = ({
  toggleHowToPlay,
  toggleBackToTitle,
  isDetailView,
  isPlaying,
}) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [hintCount, setHintCount] = useState<number>(4);

  const handleLogout = () => setIsLoggedIn(false);
  const handleSoundToggle = () => setIsSoundOn(!isSoundOn);
  const handleHintButtonClick = () =>
    hintCount > 0 && setHintCount((prevCount) => prevCount - 1);

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
        <IconButton
          onClick={toggleBackToTitle}
          icon={<ArrowBackIcon style={{ fontSize: 80 }} />}
          label="backToTitle"
        />
      )}
    </div>
  );
};

export default SideMenuButton;
