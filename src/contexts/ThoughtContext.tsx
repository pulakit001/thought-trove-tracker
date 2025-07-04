
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface Thought {
  id: string;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
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

// Local storage key
const LOCAL_STORAGE_KEY = "sparky_thoughts";

export const ThoughtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load thoughts from localStorage on mount
  useEffect(() => {
    loadThoughts();
  }, []);

  const loadThoughts = async () => {
    setLoading(true);
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const storedThoughts = localStorage.getItem(LOCAL_STORAGE_KEY);
      let parsedThoughts: Thought[] = [];
      
      if (storedThoughts) {
        try {
          parsedThoughts = JSON.parse(storedThoughts);
        } catch (error) {
          console.error("Failed to parse stored thoughts:", error);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
      
      // Sort by creation date (newest first)
      parsedThoughts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setThoughts(parsedThoughts);
    } catch (error) {
      toast.error("Failed to load thoughts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveThoughtsToStorage = (updatedThoughts: Thought[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedThoughts));
  };

  const addThought = async (title: string, description: string, location: string): Promise<Thought> => {
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
      };
      
      const updatedThoughts = [newThought, ...thoughts];
      setThoughts(updatedThoughts);
      saveThoughtsToStorage(updatedThoughts);
      
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
    setLoading(true);
    try {
      const existingThought = thoughts.find(thought => thought.id === id);
      if (!existingThought) throw new Error("Thought not found");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const now = new Date().toISOString();
      const updatedThought: Thought = {
        ...existingThought,
        title,
        description,
        location,
        updatedAt: now,
      };
      
      const updatedThoughts = thoughts.map(thought => (thought.id === id ? updatedThought : thought));
      setThoughts(updatedThoughts);
      saveThoughtsToStorage(updatedThoughts);
      
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
    setLoading(true);
    try {
      const existingThought = thoughts.find(thought => thought.id === id);
      if (!existingThought) throw new Error("Thought not found");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedThoughts = thoughts.filter(thought => thought.id !== id);
      setThoughts(updatedThoughts);
      saveThoughtsToStorage(updatedThoughts);
      
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
    return thoughts.find(thought => thought.id === id);
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
