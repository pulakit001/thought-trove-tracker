
import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="brutalist-header">
      <div className="page-container flex items-center justify-between py-4">
        <button 
          className="font-mono text-xl font-bold uppercase tracking-wide"
          onClick={() => navigate("/dashboard")}
        >
          SPARKY
        </button>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
