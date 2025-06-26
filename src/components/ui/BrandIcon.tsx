
import React from "react";
import { Lightbulb } from "lucide-react";

interface BrandIconProps {
  className?: string;
  size?: number;
}

const BrandIcon: React.FC<BrandIconProps> = ({ className = "", size = 24 }) => {
  return (
    <Lightbulb 
      className={`inline-block ${className}`}
      size={size}
    />
  );
};

export default BrandIcon;
