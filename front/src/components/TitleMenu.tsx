import React from "react";
import IconButton from "./IconButton";
import {
  MilitaryTech as MilitaryTechIcon,
  Diamond,
  EmojiEvents,
} from "@mui/icons-material";

interface TitleMenuProps {
  toggleRewardNFT: () => void;
  toggleGemSkin: () => void;
  toggleRanking: () => void;
  toggleResult: () => void;
}

const TitleMenu: React.FC<TitleMenuProps> = ({
  toggleRewardNFT,
  toggleGemSkin,
  toggleRanking,
  toggleResult,
}) => {
  const menuItems = [
    { label: "rewardNFT", icon: <MilitaryTechIcon style={{ fontSize: 80 }} /> },
    { label: "gemSkin", icon: <Diamond style={{ fontSize: 80 }} /> },
    { label: "ranking", icon: <EmojiEvents style={{ fontSize: 80 }} /> },
  ];

  const handleMenuItemClick = (label: string) => {
    const menuItemClickActions: Record<string, () => void> = {
      rewardNFT: toggleRewardNFT,
      gemSkin: toggleGemSkin,
      ranking: toggleRanking,
      result: toggleResult,
    };

    const action = menuItemClickActions[label];
    if (action) {
      action();
    }
  };

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

export default TitleMenu;
