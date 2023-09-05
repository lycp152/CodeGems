import React from "react";
import IconButton from "../components/IconButton";
import {
  MilitaryTech as MilitaryTechIcon,
  Diamond,
  EmojiEvents,
} from "@mui/icons-material";

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
    if (label === "rewardNFT") toggleRewardNFT();
    else if (label === "gemSkin") toggleGemSkin();
    else if (label === "ranking") toggleRanking();
  };

  const menuItems = [
    { label: "rewardNFT", icon: <MilitaryTechIcon style={{ fontSize: 80 }} /> },
    { label: "gemSkin", icon: <Diamond style={{ fontSize: 80 }} /> },
    { label: "ranking", icon: <EmojiEvents style={{ fontSize: 80 }} /> },
  ];

  return (
    <div className="main-menu">
      {menuItems.map((item) => (
        <IconButton
          key={item.label}
          onClick={() => handleMenuItemClick(item.label)}
          icon={item.icon}
          label={item.label}
        />
      ))}
    </div>
  );
};

export default MainMenu;
