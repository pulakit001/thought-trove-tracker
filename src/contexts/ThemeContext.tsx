
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "high-contrast";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from local storage or default to light
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) return savedTheme;
    
    // Default to light theme instead of checking system preference
    return "light";
  });

  // Update document when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove("light", "dark", "high-contrast");
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Save preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      // Only change if user hasn't explicitly set a preference
      if (!localStorage.getItem("theme")) {
        setTheme("light"); // Always default to light even on system changes
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
