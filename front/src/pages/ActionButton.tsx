import React from "react";

interface ActionButtonProps {
  icon?: React.ReactElement;
  label: string;
  onClick?: () => void;
}

export default function ActionButton({
  icon,
  label,
  onClick,
}: ActionButtonProps) {
  return (
    <button className="title-button" onClick={onClick}>
      <div className="button-content">
        {icon}
        {label}
      </div>
    </button>
  );
}
