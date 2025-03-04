
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

export interface Thought {
  id: string;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface ThoughtContextType {
  thoughts: Thought[];
  loading: boolean;
  addThought: (title: string, description: string, location: string) => Promise<Thought>;
  updateThought: (id: string, title: string, description: string, location: string) => Promise<Thought>;
  deleteThought: (id: string) => Promise<void>;
  getThought: (id: string) => Thought | undefined;
}

const ThoughtContext = createContext<ThoughtContextType | undefined>(undefined);

// Mock database
const MOCK_THOUGHTS: Record<string, Thought> = {};

export const ThoughtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load thoughts from localStorage when user changes
  useEffect(() => {
    if (user) {
      loadThoughts();
    } else {
      setThoughts([]);
      setLoading(false);
    }
  }, [user]);

  const loadThoughts = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get thoughts from localStorage or create empty array
      const storedThoughts = localStorage.getItem("thoughts");
      let parsedThoughts: Record<string, Thought> = {};
      
      if (storedThoughts) {
        try {
          parsedThoughts = JSON.parse(storedThoughts);
        } catch (error) {
          console.error("Failed to parse stored thoughts:", error);
          localStorage.removeItem("thoughts");
        }
      }
      
      // Merge with mock thoughts
      Object.assign(MOCK_THOUGHTS, parsedThoughts);
      
      // Filter thoughts for current user
      const userThoughts = Object.values(MOCK_THOUGHTS).filter(
        thought => user && thought.userId === user.id
      );
      
      // Sort by creation date (newest first)
      userThoughts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setThoughts(userThoughts);
    } catch (error) {
      toast.error("Failed to load thoughts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveThoughtsToStorage = () => {
    localStorage.setItem("thoughts", JSON.stringify(MOCK_THOUGHTS));
  };

  const addThought = async (title: string, description: string, location: string): Promise<Thought> => {
    if (!user) throw new Error("You must be logged in to add a thought");
    
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const now = new Date().toISOString();
      const newThought: Thought = {
        id: `thought_${Date.now()}`,
        title,
        description,
        location,
        createdAt: now,
        updatedAt: now,
        userId: user.id,
      };
      
      // Add to mock database
      MOCK_THOUGHTS[newThought.id] = newThought;
      saveThoughtsToStorage();
      
      // Update state
      setThoughts(prev => [newThought, ...prev]);
      
      toast.success("Thought created successfully");
      return newThought;
    } catch (error) {
      toast.error("Failed to create thought");
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateThought = async (id: string, title: string, description: string, location: string): Promise<Thought> => {
    if (!user) throw new Error("You must be logged in to update a thought");
    
    setLoading(true);
    try {
      // Check if thought exists and belongs to user
      const thought = MOCK_THOUGHTS[id];
      if (!thought) throw new Error("Thought not found");
      if (thought.userId !== user.id) throw new Error("You don't have permission to update this thought");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update thought
      const now = new Date().toISOString();
      const updatedThought: Thought = {
        ...thought,
        title,
        description,
        location,
        updatedAt: now,
      };
      
      // Update mock database
      MOCK_THOUGHTS[id] = updatedThought;
      saveThoughtsToStorage();
      
      // Update state
      setThoughts(prev => prev.map(item => (item.id === id ? updatedThought : item)));
      
      toast.success("Thought updated successfully");
      return updatedThought;
    } catch (error) {
      toast.error("Failed to update thought: " + (error instanceof Error ? error.message : "Unknown error"));
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteThought = async (id: string): Promise<void> => {
    if (!user) throw new Error("You must be logged in to delete a thought");
    
    setLoading(true);
    try {
      // Check if thought exists and belongs to user
      const thought = MOCK_THOUGHTS[id];
      if (!thought) throw new Error("Thought not found");
      if (thought.userId !== user.id) throw new Error("You don't have permission to delete this thought");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Delete from mock database
      delete MOCK_THOUGHTS[id];
      saveThoughtsToStorage();
      
      // Update state
      setThoughts(prev => prev.filter(item => item.id !== id));
      
      toast.success("Thought deleted successfully");
    } catch (error) {
      toast.error("Failed to delete thought: " + (error instanceof Error ? error.message : "Unknown error"));
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getThought = (id: string): Thought | undefined => {
    return MOCK_THOUGHTS[id];
  };

  return (
    <ThoughtContext.Provider
      value={{
        thoughts,
        loading,
        addThought,
        updateThought,
        deleteThought,
        getThought,
      }}
    >
      {children}
    </ThoughtContext.Provider>
  );
};

export const useThoughts = () => {
  const context = useContext(ThoughtContext);
  if (context === undefined) {
    throw new Error("useThoughts must be used within a ThoughtProvider");
  }
  return context;
};
