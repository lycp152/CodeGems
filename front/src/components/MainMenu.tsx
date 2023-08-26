import React from "react";
import IconButton from "../components/IconButton";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DiamondIcon from "@mui/icons-material/Diamond";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface MainMenuProps {
  toggleRewardNFT: () => void;
  toggleGemSkin: () => void;
  toggleRanking: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({
  toggleRewardNFT,
  toggleGemSkin,
  toggleRanking,
}) => {
  const handleMenuItemClick = (label: string) => {
    if (label === "rewardNFT") {
      toggleRewardNFT();
    } else if (label === "gemSkin") {
      toggleGemSkin();
    } else if (label === "ranking") {
      toggleRanking();
    }
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
