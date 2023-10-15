import React from "react";

interface NumberedImageProps {
  number: number;
  imageSrc: string;
  label: string;
}

const NumberedImage: React.FC<NumberedImageProps> = ({
  number,
  imageSrc,
  label,
}) => {
  return (
    <div className="numbered-image-container">
      <div className="number">{number}</div>
      <img src={imageSrc} alt={`Gem ${number}`} className="image" />
    </div>
  );
};

export default NumberedImage;
