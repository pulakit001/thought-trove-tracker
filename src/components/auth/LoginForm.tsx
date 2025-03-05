
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { toast } from "sonner";
import { LucideLoader2 } from "lucide-react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedEmails, setSavedEmails] = useState<string[]>([]);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Load previously used emails
  useEffect(() => {
    try {
      const storedEmails = localStorage.getItem("savedEmails");
      if (storedEmails) {
        setSavedEmails(JSON.parse(storedEmails));
      }
    } catch (error) {
      console.error("Failed to load saved emails:", error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      
      // Save email for future logins if it's not already saved
      if (!savedEmails.includes(email)) {
        const updatedEmails = [...savedEmails, email];
        setSavedEmails(updatedEmails);
        localStorage.setItem("savedEmails", JSON.stringify(updatedEmails));
      }
      
      navigate("/dashboard");
    } catch (error) {
      // Error is already handled in the AuthContext
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectEmail = (selectedEmail: string) => {
    setEmail(selectedEmail);
  };

  return (
    <AnimatedContainer animation="slide-up" className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
          />
          
          {/* Show previously used emails */}
          {savedEmails.length > 0 && email === "" && (
            <div className="mt-2 p-2 border border-gray-200 rounded-md bg-gray-50">
              <p className="text-sm text-muted-foreground mb-1">Previously used emails:</p>
              <div className="space-y-1">
                {savedEmails.map((savedEmail) => (
                  <Button
                    key={savedEmail}
                    type="button"
                    variant="ghost"
                    className="w-full justify-start text-sm h-8 px-2"
                    onClick={() => handleSelectEmail(savedEmail)}
                  >
                    {savedEmail}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base"
        >
          {isSubmitting ? (
            <>
              <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
        
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </div>
      </form>
    </AnimatedContainer>
  );
};

export default LoginForm;
