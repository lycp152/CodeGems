import React from "react";

interface LongButtonProps {
  icon?: React.ReactElement;
  label: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export default function LongButton({
  icon,
  label,
  onClick,
  className,
  ariaLabel,
}: LongButtonProps) {
  return (
    <button
      className={`long-button ${className}`}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      <div className="button-content">
        {icon}
        {label}
      </div>
    </button>
  );
}
