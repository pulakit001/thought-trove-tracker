
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, Sparkles, BrainCircuit, LogOut } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AnimatedContainer animation="fade" className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/dashboard")}>
          <LightbulbIcon className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl hidden sm:inline-block">
            Sparky
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
          {/* User info */}
          {user && (
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Welcome, {user.name}
            </span>
          )}
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Logout Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Header;
