import React from "react";
import IconButton from "../components/IconButton";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DiamondIcon from "@mui/icons-material/Diamond";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface MainMenuProps {}

const MainMenu: React.FC<MainMenuProps> = () => {
  return (
    <div className="main-menu">
      <IconButton
        icon={<MilitaryTechIcon style={{ fontSize: 80 }} />}
        label="rewardNFT"
      />
      <IconButton
        icon={<DiamondIcon style={{ fontSize: 80 }} />}
        label="gemSkin"
      />
      <IconButton
        icon={<EmojiEventsIcon style={{ fontSize: 80 }} />}
        label="ranking"
      />
    </div>
  );
};

export default MainMenu;
