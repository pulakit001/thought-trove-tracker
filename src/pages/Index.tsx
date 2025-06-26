
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const Index: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-1 bg-gray-200 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-gray-200 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-gray-200 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-gray-200 rounded-full animate-pulse opacity-30" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-md w-full text-center space-y-12">
        {/* Logo */}
        <AnimatedContainer animation="fade" className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center">
            <img 
              src="/lovable-uploads/d42ddfd4-0236-42e7-acf6-a095e38ec479.png" 
              alt="Sparky Logo" 
              className="w-full h-full object-contain opacity-90"
            />
          </div>
        </AnimatedContainer>

        {/* Brand Name */}
        <AnimatedContainer animation="slide-up" delay={200}>
          <h1 className="text-6xl font-light text-gray-900 tracking-wide mb-4">
            sparky.
          </h1>
          <p className="text-gray-500 text-lg font-light tracking-wide">
            write without distraction.
          </p>
        </AnimatedContainer>

        {/* Action Button */}
        <AnimatedContainer animation="slide-up" delay={400} className="space-y-4">
          <Button
            onClick={() => navigate("/signup")}
            size="lg"
            className="w-full max-w-xs mx-auto h-12 text-base font-normal bg-gray-900 hover:bg-gray-800 text-white rounded-full border-0 transition-all duration-500 hover:scale-105 shadow-sm hover:shadow-md"
          >
            get started
          </Button>
          
          <div className="pt-4">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-500 hover:text-gray-700 text-sm font-light tracking-wide transition-colors duration-300 underline-offset-4 hover:underline"
            >
              already have an account?
            </button>
          </div>
        </AnimatedContainer>
      </div>

      {/* Subtle footer */}
      <div className="absolute bottom-8 text-xs text-gray-300 font-light tracking-widest">
        focus • create • inspire
      </div>
    </main>
  );
};

export default Index;
