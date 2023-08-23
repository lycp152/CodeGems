import LogoutIcon from "@mui/icons-material/Logout";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import "../styles/SideMenuButton.css";
import { useAuth } from "../context/AuthContext";

export default function SideMenuButton() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div className="side-buttons">
      {isLoggedIn ? (
        <button onClick={handleLogout} className="side-button">
          <div className="button-content">
            <LogoutIcon style={{ fontSize: 80 }} />
            Logout
          </div>
        </button>
      ) : null}
      <button className="side-button">
        <div className="button-content">
          <div className="icon">
            <VolumeUpIcon style={{ fontSize: 80 }} />
          </div>
          <div className="text">sound</div>
        </div>
      </button>
      <button className="side-button">
        <div className="button-content">
          <div className="icon">
            <QuestionMarkIcon style={{ fontSize: 80 }} />
          </div>
          <div className="text">howToPlay</div>
        </div>
      </button>
    </div>
  );
}
