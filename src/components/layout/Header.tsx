
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LightbulbIcon, LogOut, User, Sparkles, BrainCircuit } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <AnimatedContainer animation="fade" className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <LightbulbIcon className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl hidden sm:inline-block">
            IdeasApp
          </span>
        </Link>

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
          
          {user && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-10 w-10"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-2"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Header;
