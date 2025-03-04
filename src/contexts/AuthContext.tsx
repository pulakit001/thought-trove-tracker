
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const MOCK_USERS: Record<string, User & { password: string }> = {};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing user in localStorage (simulating persistent auth)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user with matching email
      const userIds = Object.keys(MOCK_USERS);
      const matchingUserId = userIds.find(id => MOCK_USERS[id].email === email);
      
      if (!matchingUserId || MOCK_USERS[matchingUserId].password !== password) {
        throw new Error("Invalid credentials");
      }
      
      const { password: _, ...userWithoutPassword } = MOCK_USERS[matchingUserId];
      
      // Set user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast.success("Successfully logged in");
    } catch (error) {
      toast.error("Login failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists
      const userIds = Object.keys(MOCK_USERS);
      const emailExists = userIds.some(id => MOCK_USERS[id].email === email);
      
      if (emailExists) {
        throw new Error("Email already in use");
      }
      
      // Create new user
      const id = `user_${Date.now()}`;
      const newUser = { id, email, name, password };
      MOCK_USERS[id] = newUser;
      
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Set user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("Signup failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
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
