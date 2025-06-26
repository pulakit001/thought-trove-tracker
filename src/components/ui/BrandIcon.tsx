
import React from "react";

interface BrandIconProps {
  className?: string;
  size?: number;
}

const BrandIcon: React.FC<BrandIconProps> = ({ className = "", size = 24 }) => {
  return (
    <img 
      src="/lovable-uploads/d42ddfd4-0236-42e7-acf6-a095e38ec479.png" 
      alt="Sparky Logo" 
      width={size}
      height={size}
      className={`inline-block object-contain ${className}`}
    />
  );
};

export default BrandIcon;
