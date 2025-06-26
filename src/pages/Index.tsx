
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto flex-1 flex flex-col justify-center items-center px-4 py-16">
        <AnimatedContainer animation="scale" className="text-center max-w-2xl">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <BrandIcon size={32} />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Capture Your Best Ideas Before They Disappear
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-lg mx-auto">
            A simple, intuitive app for storing, managing, and organizing your ideas securely.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="text-base px-8"
            >
              Sign In
            </Button>
            
            <Button
              onClick={() => navigate("/signup")}
              variant="outline"
              size="lg"
              className="text-base px-8 group"
            >
              Create Account
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </AnimatedContainer>
        
        <AnimatedContainer 
          animation="fade" 
          delay={300}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto sm:mx-0">
              <BrandIcon size={24} />
            </div>
            <h3 className="font-semibold text-lg">Quick Capture</h3>
            <p className="text-muted-foreground">Save ideas instantly with our clean, distraction-free interface.</p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto sm:mx-0">
              <BrandIcon size={24} />
            </div>
            <h3 className="font-semibold text-lg">Private & Secure</h3>
            <p className="text-muted-foreground">Your ideas remain private with personal user accounts.</p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto sm:mx-0">
              <BrandIcon size={24} />
            </div>
            <h3 className="font-semibold text-lg">Stay Organized</h3>
            <p className="text-muted-foreground">Search, filter, and organize your ideas as your collection grows.</p>
          </div>
        </AnimatedContainer>
      </div>
    </main>
  );
};

export default Index;
