import React from "react";
import "../styles/SideMenu.css";
import {
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import IconButton from "./IconButton";

interface PlayMenuProps {
  togglePause: () => void;
  toggleBackToTitle: () => void;
  isGamePaused: boolean;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayMenu: React.FC<PlayMenuProps> = ({
  togglePause,
  toggleBackToTitle,
  isGamePaused,
  isPlaying,
  setIsPlaying,
}) => {
  const handleBackToTitle = () => {
    setIsPlaying(false);
    toggleBackToTitle();
  };

  return (
    <div className="play-menu">
      <IconButton
        onClick={togglePause}
        icon={
          isGamePaused ? (
            <PlayArrowIcon style={{ fontSize: 80 }} />
          ) : (
            <PauseIcon style={{ fontSize: 80 }} />
          )
        }
        label={isGamePaused ? "play" : "pause"}
      />
      <IconButton
        onClick={handleBackToTitle}
        icon={<ArrowBackIcon style={{ fontSize: 80 }} />}
        label="backToTitle"
      />
    </div>
  );
};

export default PlayMenu;
