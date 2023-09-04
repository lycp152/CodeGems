import React from "react";

interface NumberedImageProps {
  number: number;
  imageSrc: string;
  label: string;
}

export default function NumberedImage({
  number,
  imageSrc,
  label,
}: NumberedImageProps) {
  return (
    <div className="numbered-image-container">
      <div className="number">{number}</div>
      <img src={imageSrc} alt={`Gem ${number}`} className="image" />
    </div>
  );
}
