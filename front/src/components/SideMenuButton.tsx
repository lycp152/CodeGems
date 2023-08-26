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
import { usePlay } from "../context/PlayContext";
import IconButton from "./IconButton";
import "../styles/SideMenuButton.css";

interface SideMenuButtonProps {
  toggleHowToPlay: () => void;
  isDetailView: boolean; // isDetailViewをPropsとして受け取る
}

const SideMenuButton: React.FC<SideMenuButtonProps> = ({
  toggleHowToPlay,
  isDetailView,
}) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { isPlaying } = usePlay();
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [hintCount, setHintCount] = useState<number>(4);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSoundToggle = () => {
    setIsSoundOn((prevState) => !prevState);
  };

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
          onClick={toggleHowToPlay}
          icon={<ArrowBackIcon style={{ fontSize: 80 }} />}
          label="backToTitle"
        />
      )}
    </div>
  );
};

export default SideMenuButton;
