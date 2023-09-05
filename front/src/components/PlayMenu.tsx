import React from "react";
import "../styles/SideMenuButton.css";
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
}

const PlayMenu: React.FC<PlayMenuProps> = ({
  togglePause,
  toggleBackToTitle,
  isGamePaused,
}) => {
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
        onClick={toggleBackToTitle}
        icon={<ArrowBackIcon style={{ fontSize: 80 }} />}
        label="backToTitle"
      />
    </div>
  );
};

export default PlayMenu;
