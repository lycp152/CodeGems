import React from "react";
import Gem from "./Gem";

interface GemGridProps {
  grid: { gemValue: number; backgroundColor: string }[][];
  selectedGem: { row: number; col: number } | null;
  onGemClick: (row: number, col: number) => void;
}

const GemGrid: React.FC<GemGridProps> = ({ grid, selectedGem, onGemClick }) => (
  <div className="grid-container">
    {grid.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((gem, colIndex) => (
          <Gem
            key={colIndex}
            gemValue={gem.gemValue}
            backgroundColor={gem.backgroundColor}
            isSelected={
              selectedGem?.row === rowIndex && selectedGem?.col === colIndex
            }
            onClick={() => onGemClick(rowIndex, colIndex)}
          />
        ))}
      </div>
    ))}
  </div>
);

export default GemGrid;
