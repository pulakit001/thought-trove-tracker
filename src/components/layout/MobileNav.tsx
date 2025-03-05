
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, BrainCircuit } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const MobileNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isIdeasActive = location.pathname === "/dashboard" || location.pathname === "/new" || location.pathname.startsWith("/edit/");
  const isThoughtsActive = location.pathname === "/thoughts" || location.pathname === "/new-thought" || location.pathname.startsWith("/edit-thought/");

  return (
    <AnimatedContainer animation="slide-up" className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border/40 bg-background/80 backdrop-blur-sm p-2">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant={isIdeasActive ? "default" : "outline"}
          className={`flex-1 py-6 ${isIdeasActive ? "" : "text-muted-foreground"}`}
          onClick={() => navigate("/dashboard")}
        >
          <div className="flex flex-col items-center gap-1">
            <LightbulbIcon className="w-5 h-5" />
            <span className="text-xs">Ideas</span>
          </div>
        </Button>
        
        <Button
          variant={isThoughtsActive ? "default" : "outline"}
          className={`flex-1 py-6 ${isThoughtsActive ? "" : "text-muted-foreground"}`}
          onClick={() => navigate("/thoughts")}
        >
          <div className="flex flex-col items-center gap-1">
            <BrainCircuit className="w-5 h-5" />
            <span className="text-xs">Thoughts</span>
          </div>
        </Button>
      </div>
    </AnimatedContainer>
  );
};

export default MobileNav;
