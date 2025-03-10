
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

  return (
    <AnimatedContainer animation="fade">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
