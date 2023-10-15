import React from "react";

interface GemProps {
  gemValue: number;
  backgroundColor: string;
  isSelected: boolean;
  onClick: () => void;
}

const Gem: React.FC<GemProps> = ({
  gemValue,
  backgroundColor,
  isSelected,
  onClick,
}) => (
  <div
    className={`gem gem-${gemValue} ${isSelected ? "selected" : ""}`}
    style={{
      position: "relative",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <div className="gem-background" style={{ backgroundColor, zIndex: -1 }} />
    {isSelected && <div className="gem-cursor" />}
  </div>
);

export default Gem;
