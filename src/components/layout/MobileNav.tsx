
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isIdeasActive = location.pathname === "/dashboard" || location.pathname === "/new" || location.pathname.startsWith("/edit/");
  const isThoughtsActive = location.pathname === "/thoughts" || location.pathname === "/new-thought" || location.pathname.startsWith("/edit-thought/");
  const isAIActive = location.pathname === "/ai";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 brutalist-nav">
      <div className="flex">
        <button
          className={`brutalist-nav-item ${isIdeasActive ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          IDEAS
        </button>
        
        <button
          className={`brutalist-nav-item ${isThoughtsActive ? "active" : ""}`}
          onClick={() => navigate("/thoughts")}
        >
          THOUGHTS
        </button>
        
        <button
          className={`brutalist-nav-item ${isAIActive ? "active" : ""}`}
          onClick={() => navigate("/ai")}
        >
          AI
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
