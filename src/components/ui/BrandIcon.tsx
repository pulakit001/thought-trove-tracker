
import React from "react";

interface BrandIconProps {
  className?: string;
  size?: number;
}

const BrandIcon: React.FC<BrandIconProps> = ({ className = "", size = 24 }) => {
  return (
    <img
      src="/lovable-uploads/d1f2ecf0-70de-4b1d-b21a-bf4bd3b5f58e.png"
      alt="Brand Icon"
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default BrandIcon;
