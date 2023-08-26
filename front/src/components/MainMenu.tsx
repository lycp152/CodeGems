import React from "react";
import IconButton from "../components/IconButton";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DiamondIcon from "@mui/icons-material/Diamond";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface MainMenuProps {
  toggleDetailView: () => void; // 新しく追加
}

const MainMenu: React.FC<MainMenuProps> = ({ toggleDetailView }) => {
  return (
    <div className="main-menu">
      <IconButton
        onClick={toggleDetailView} // rewardNFT アイコンが押されたときに toggleDetailView を呼び出す
        icon={<MilitaryTechIcon style={{ fontSize: 80 }} />}
        label="rewardNFT"
      />
      <IconButton
        onClick={toggleDetailView} // gemSkin アイコンが押されたときに toggleDetailView を呼び出す
        icon={<DiamondIcon style={{ fontSize: 80 }} />}
        label="gemSkin"
      />
      <IconButton
        onClick={toggleDetailView} // ranking アイコンが押されたときに toggleDetailView を呼び出す
        icon={<EmojiEventsIcon style={{ fontSize: 80 }} />}
        label="ranking"
      />
    </div>
  );
};

export default MainMenu;
