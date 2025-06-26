
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import BrandIcon from "@/components/ui/BrandIcon";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <AnimatedContainer animation="scale" className="text-center max-w-md w-full">
          {/* Brand Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
              <BrandIcon size={48} className="text-white" />
            </div>
          </div>
          
          {/* Welcome Text */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Welcome to
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Sparky
          </h2>
          
          <p className="text-white/90 text-lg mb-12 leading-relaxed">
            Write your ideas and thoughts in one place
          </p>
          
          {/* Glassmorphism Buttons */}
          <div className="space-y-4 w-full">
            <AnimatedContainer animation="slide-up" delay={200}>
              <Button
                onClick={() => navigate("/signup")}
                size="lg"
                className="w-full h-14 text-lg font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-2xl"
                variant="outline"
              >
                Sign up
              </Button>
            </AnimatedContainer>
            
            <AnimatedContainer animation="slide-up" delay={300}>
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="w-full h-14 text-lg font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-2xl"
                variant="outline"
              >
                Log in
              </Button>
            </AnimatedContainer>
          </div>
        </AnimatedContainer>
      </div>
    </main>
  );
};

export default Index;
