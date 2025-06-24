
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, Sparkles, BrainCircuit } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AnimatedContainer animation="fade" className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/dashboard")}>
          <LightbulbIcon className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl hidden sm:inline-block">
            IdeasApp
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
          >
            <LightbulbIcon className="h-4 w-4 mr-2" />
            Ideas
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/thoughts")}
          >
            <BrainCircuit className="h-4 w-4 mr-2" />
            Thoughts
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/ai")}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Header;
