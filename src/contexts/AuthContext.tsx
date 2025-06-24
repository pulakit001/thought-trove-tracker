
import React, { createContext, useContext, useState, useEffect } from "react";

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

// Default local user - everyone uses the same local account
const LOCAL_USER: User = {
  id: "local_user",
  email: "local@user.com",
  name: "Local User"
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Automatically set the local user as authenticated
    setUser(LOCAL_USER);
    setLoading(false);
  }, []);

  // These functions are kept for compatibility but don't do anything
  const login = async (email: string, password: string) => {
    setUser(LOCAL_USER);
  };

  const signup = async (email: string, password: string, name: string) => {
    setUser(LOCAL_USER);
  };

  const logout = () => {
    // Do nothing - user stays logged in locally
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: true, // Always authenticated locally
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
