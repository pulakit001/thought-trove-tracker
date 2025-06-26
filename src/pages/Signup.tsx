
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "@/components/auth/SignupForm";
import { useAuth } from "@/contexts/AuthContext";
import { LightbulbIcon } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const Signup: React.FC = () => {
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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        <AnimatedContainer animation="fade" className="text-center mb-8">
          <LightbulbIcon className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-muted-foreground">
            Sign up to start capturing your ideas
          </p>
        </AnimatedContainer>

        <SignupForm />
      </div>
    </main>
  );
};

export default Signup;
