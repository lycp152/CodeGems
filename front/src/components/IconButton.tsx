import React from "react";

interface IconTextButtonProps {
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
}

const IconTextButton: React.FC<IconTextButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button className="icon-button" onClick={onClick} aria-label={label}>
      <div className="button-content">
        <div className="icon">{icon}</div>
        <div className="text">{label}</div>
      </div>
    </button>
  );
};

export default IconTextButton;
