
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

export interface Idea {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface IdeaContextType {
  ideas: Idea[];
  loading: boolean;
  addIdea: (title: string, description: string) => Promise<Idea>;
  updateIdea: (id: string, title: string, description: string) => Promise<Idea>;
  deleteIdea: (id: string) => Promise<void>;
  getIdea: (id: string) => Idea | undefined;
}

const IdeaContext = createContext<IdeaContextType | undefined>(undefined);

// Mock database
const MOCK_IDEAS: Record<string, Idea> = {};

export const IdeaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load ideas from localStorage when user changes
  useEffect(() => {
    if (user) {
      loadIdeas();
    } else {
      setIdeas([]);
      setLoading(false);
    }
  }, [user]);

  const loadIdeas = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get ideas from localStorage or create empty array
      const storedIdeas = localStorage.getItem("ideas");
      let parsedIdeas: Record<string, Idea> = {};
      
      if (storedIdeas) {
        try {
          parsedIdeas = JSON.parse(storedIdeas);
        } catch (error) {
          console.error("Failed to parse stored ideas:", error);
          localStorage.removeItem("ideas");
        }
      }
      
      // Merge with mock ideas
      Object.assign(MOCK_IDEAS, parsedIdeas);
      
      // Filter ideas for current user
      const userIdeas = Object.values(MOCK_IDEAS).filter(
        idea => user && idea.userId === user.id
      );
      
      // Sort by creation date (newest first)
      userIdeas.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setIdeas(userIdeas);
    } catch (error) {
      toast.error("Failed to load ideas");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveIdeasToStorage = () => {
    localStorage.setItem("ideas", JSON.stringify(MOCK_IDEAS));
  };

  const addIdea = async (title: string, description: string): Promise<Idea> => {
    if (!user) throw new Error("You must be logged in to add an idea");
    
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const now = new Date().toISOString();
      const newIdea: Idea = {
        id: `idea_${Date.now()}`,
        title,
        description,
        createdAt: now,
        updatedAt: now,
        userId: user.id,
      };
      
      // Add to mock database
      MOCK_IDEAS[newIdea.id] = newIdea;
      saveIdeasToStorage();
      
      // Update state
      setIdeas(prev => [newIdea, ...prev]);
      
      toast.success("Idea created successfully");
      return newIdea;
    } catch (error) {
      toast.error("Failed to create idea");
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateIdea = async (id: string, title: string, description: string): Promise<Idea> => {
    if (!user) throw new Error("You must be logged in to update an idea");
    
    setLoading(true);
    try {
      // Check if idea exists and belongs to user
      const idea = MOCK_IDEAS[id];
      if (!idea) throw new Error("Idea not found");
      if (idea.userId !== user.id) throw new Error("You don't have permission to update this idea");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update idea
      const now = new Date().toISOString();
      const updatedIdea: Idea = {
        ...idea,
        title,
        description,
        updatedAt: now,
      };
      
      // Update mock database
      MOCK_IDEAS[id] = updatedIdea;
      saveIdeasToStorage();
      
      // Update state
      setIdeas(prev => prev.map(item => (item.id === id ? updatedIdea : item)));
      
      toast.success("Idea updated successfully");
      return updatedIdea;
    } catch (error) {
      toast.error("Failed to update idea: " + (error instanceof Error ? error.message : "Unknown error"));
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteIdea = async (id: string): Promise<void> => {
    if (!user) throw new Error("You must be logged in to delete an idea");
    
    setLoading(true);
    try {
      // Check if idea exists and belongs to user
      const idea = MOCK_IDEAS[id];
      if (!idea) throw new Error("Idea not found");
      if (idea.userId !== user.id) throw new Error("You don't have permission to delete this idea");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Delete from mock database
      delete MOCK_IDEAS[id];
      saveIdeasToStorage();
      
      // Update state
      setIdeas(prev => prev.filter(item => item.id !== id));
      
      toast.success("Idea deleted successfully");
    } catch (error) {
      toast.error("Failed to delete idea: " + (error instanceof Error ? error.message : "Unknown error"));
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getIdea = (id: string): Idea | undefined => {
    return MOCK_IDEAS[id];
  };

  return (
    <IdeaContext.Provider
      value={{
        ideas,
        loading,
        addIdea,
        updateIdea,
        deleteIdea,
        getIdea,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
};

export const useIdeas = () => {
  const context = useContext(IdeaContext);
  if (context === undefined) {
    throw new Error("useIdeas must be used within an IdeaProvider");
  }
  return context;
};
