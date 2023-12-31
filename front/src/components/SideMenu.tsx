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
import "../styles/SideMenu.css";
import { signOut, getAuth } from "firebase/auth";

interface SideMenuProps {
  toggleHowToPlay: () => void;
  toggleBackToTitle: () => void;
  toggleBackToPlay: () => void;
  isDetailView: boolean;
  isPlaying: boolean;
  hintCount: number;
  setHintCount: React.Dispatch<React.SetStateAction<number>>;
  isGamePaused: boolean;
  setIsGamePaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu: React.FC<SideMenuProps> = ({
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
  const { isLoggedIn, setIsLoggedIn, githubUsername } = useAuth(); // GitHubのユーザーネームを追加
  const [isSoundOn, setIsSoundOn] = useState(true);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setIsLoggedIn(false);
  };

  const handleSoundToggle = () => setIsSoundOn(!isSoundOn);

  const handleHintButtonClick = () => {
    if (hintCount > 0) {
      setHintCount((prevCount) => prevCount - 1);
    }
  };

  const renderButtons = () => {
    if (!isDetailView) {
      return (
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
              <div>
                <img src="/images/github-icon.png" alt="GitHub Icon" />{" "}
                {/* GitHubのアイコンを表示 */}
                <div>{githubUsername}</div> {/* GitHubのユーザーネームを表示 */}
                <IconButton
                  onClick={handleLogout}
                  icon={<LogoutIcon style={{ fontSize: 80 }} />}
                  label="logOut"
                />
              </div>
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
      );
    } else {
      return (
        <IconButton
          onClick={isPlaying ? toggleBackToPlay : toggleBackToTitle}
          icon={<ArrowBackIcon style={{ fontSize: 80 }} />}
          label={isPlaying ? "backToPlay" : "backToTitle"}
        />
      );
    }
  };

  return <div className="side-buttons">{renderButtons()}</div>;
};

export default SideMenu;
