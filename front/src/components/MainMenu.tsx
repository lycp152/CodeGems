import React from "react";
import IconButton from "../components/IconButton";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DiamondIcon from "@mui/icons-material/Diamond";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface MainMenuProps {
  toggleDetailView: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ toggleDetailView }) => {
  const handleMenuItemClick = (label: string) => {
    if (label === "rewardNFT" || label === "gemSkin" || label === "ranking") {
      toggleDetailView(); // toggleDetailView を呼び出す
    }
    // 他のメニューアイテムをクリックした場合の処理を追加できます
  };

  return (
    <div className="main-menu">
      <IconButton
        onClick={() => handleMenuItemClick("rewardNFT")}
        icon={<MilitaryTechIcon style={{ fontSize: 80 }} />}
        label="rewardNFT"
      />
      <IconButton
        onClick={() => handleMenuItemClick("gemSkin")}
        icon={<DiamondIcon style={{ fontSize: 80 }} />}
        label="gemSkin"
      />
      <IconButton
        onClick={() => handleMenuItemClick("ranking")}
        icon={<EmojiEventsIcon style={{ fontSize: 80 }} />}
        label="ranking"
      />
    </div>
  );
};

export default MainMenu;
