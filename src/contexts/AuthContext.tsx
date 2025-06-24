
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (email: string, password: string, name?: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error("Login error:", error);
        toast.error(error.message);
        return { error: error.message };
      }

      console.log("Login successful:", data.user?.email);
      toast.success("Successfully logged in!");
      return {};
    } catch (error) {
      console.error("Login exception:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
      return { error: errorMessage };
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      console.log("Attempting signup for:", email);
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: name ? { name } : undefined,
        }
      });

      if (error) {
        console.error("Signup error:", error);
        toast.error(error.message);
        return { error: error.message };
      }

      console.log("Signup successful:", data.user?.email);
      
      if (data.user && !data.session) {
        toast.success("Account created! Please check your email to verify your account.");
      } else {
        toast.success("Account created successfully!");
      }
      
      return {};
    } catch (error) {
      console.error("Signup exception:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
      return { error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Error logging out: " + error.message);
      } else {
        toast.success("Successfully logged out!");
      }
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
