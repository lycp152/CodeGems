import React from "react";

interface IconButtonProps {
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button className="icon-button" onClick={onClick}>
      <div className="button-content">
        <div className="icon">{icon}</div>
        <div className="text">{label}</div>
      </div>
    </button>
  );
};

export default IconButton;