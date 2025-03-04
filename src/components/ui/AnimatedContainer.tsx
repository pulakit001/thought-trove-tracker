
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fade" | "scale" | "slide-up" | "slide-down" | "none";
  delay?: number;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  animation = "fade",
  delay = 0,
  className,
  ...props
}) => {
  const getAnimationClass = () => {
    switch (animation) {
      case "fade":
        return "animate-fade-in";
      case "scale":
        return "animate-scale-in";
      case "slide-up":
        return "animate-slide-up";
      case "slide-down":
        return "animate-slide-down";
      case "none":
        return "";
      default:
        return "animate-fade-in";
    }
  };

  return (
    <div
      className={cn(getAnimationClass(), className)}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
