
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface Idea {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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

// Local storage key
const LOCAL_STORAGE_KEY = "sparky_ideas";

export const IdeaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load ideas from localStorage on mount
  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    setLoading(true);
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const storedIdeas = localStorage.getItem(LOCAL_STORAGE_KEY);
      let parsedIdeas: Idea[] = [];
      
      if (storedIdeas) {
        try {
          parsedIdeas = JSON.parse(storedIdeas);
        } catch (error) {
          console.error("Failed to parse stored ideas:", error);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
      
      // Sort by creation date (newest first)
      parsedIdeas.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setIdeas(parsedIdeas);
    } catch (error) {
      toast.error("Failed to load ideas");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveIdeasToStorage = (updatedIdeas: Idea[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedIdeas));
  };

  const addIdea = async (title: string, description: string): Promise<Idea> => {
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
      };
      
      const updatedIdeas = [newIdea, ...ideas];
      setIdeas(updatedIdeas);
      saveIdeasToStorage(updatedIdeas);
      
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
    setLoading(true);
    try {
      const existingIdea = ideas.find(idea => idea.id === id);
      if (!existingIdea) throw new Error("Idea not found");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const now = new Date().toISOString();
      const updatedIdea: Idea = {
        ...existingIdea,
        title,
        description,
        updatedAt: now,
      };
      
      const updatedIdeas = ideas.map(idea => (idea.id === id ? updatedIdea : idea));
      setIdeas(updatedIdeas);
      saveIdeasToStorage(updatedIdeas);
      
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
    setLoading(true);
    try {
      const existingIdea = ideas.find(idea => idea.id === id);
      if (!existingIdea) throw new Error("Idea not found");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedIdeas = ideas.filter(idea => idea.id !== id);
      setIdeas(updatedIdeas);
      saveIdeasToStorage(updatedIdeas);
      
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
    return ideas.find(idea => idea.id === id);
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
