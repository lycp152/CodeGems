import React from "react";
import IconButton from "./IconButton";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LogoutIcon from "@mui/icons-material/Logout";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useAuth } from "../context/AuthContext";
import { usePlay } from "../context/PlayContext";
import "../styles/SideMenuButton.css";

export default function SideMenuButton() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const { isPlaying } = usePlay();

  const isDetailView = false; // ここにメニューの詳細画面かどうかの条件を追加

  return (
    <div className="side-buttons">
      {!isDetailView && (
        <>
          {isPlaying ? (
            <IconButton
              icon={<LightbulbIcon style={{ fontSize: 80 }} />}
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
            icon={<VolumeUpIcon style={{ fontSize: 80 }} />}
            label="sound"
          />
          <IconButton
            icon={<QuestionMarkIcon style={{ fontSize: 80 }} />}
            label="howToPlay"
          />
        </>
      )}
    </div>
  );
}
