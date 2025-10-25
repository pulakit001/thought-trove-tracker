
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon, EyeIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === "dark") return <Moon className="h-[1.2rem] w-[1.2rem]" />;
    if (theme === "high-contrast") return <EyeIcon className="h-[1.2rem] w-[1.2rem]" />;
    return <Sun className="h-[1.2rem] w-[1.2rem]" />;
  };

  return (
    <AnimatedContainer animation="fade">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="brutalist-button">
            {getThemeIcon()}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("high-contrast")}>
            <EyeIcon className="mr-2 h-4 w-4" />
            <span>High Contrast</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </AnimatedContainer>
  );
}
