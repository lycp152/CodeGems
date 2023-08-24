import React from "react";

interface LongButtonProps {
  icon?: React.ReactElement;
  label: string;
  onClick?: () => void;
}

export default function ActionButton({
  icon,
  label,
  onClick,
}: LongButtonProps) {
  return (
    <button className="title-button" onClick={onClick}>
      <div className="button-content">
        {icon}
        {label}
      </div>
    </button>
  );
}
