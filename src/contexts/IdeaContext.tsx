
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
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

export const IdeaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, isAuthenticated } = useAuth();

  // Load ideas when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadIdeas();
      migrateLocalStorageData();
    } else {
      setIdeas([]);
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const migrateLocalStorageData = async () => {
    try {
      const storedIdeas = localStorage.getItem("ideas");
      if (storedIdeas && user) {
        const parsedIdeas: Record<string, Idea> = JSON.parse(storedIdeas);
        const ideasArray = Object.values(parsedIdeas);
        
        if (ideasArray.length > 0) {
          console.log("Migrating", ideasArray.length, "ideas from localStorage to Supabase");
          
          for (const idea of ideasArray) {
            // Check if idea already exists in Supabase
            const { data: existingIdea } = await supabase
              .from('ideas')
              .select('id')
              .eq('title', idea.title)
              .eq('description', idea.description)
              .single();
            
            if (!existingIdea) {
              await supabase.from('ideas').insert({
                title: idea.title,
                description: idea.description,
                user_id: user.id,
                created_at: idea.createdAt,
                updated_at: idea.updatedAt,
              });
            }
          }
          
          // Clear localStorage after successful migration
          localStorage.removeItem("ideas");
          toast.success("Successfully migrated your ideas to the cloud!");
          
          // Reload ideas to show migrated data
          loadIdeas();
        }
      }
    } catch (error) {
      console.error("Error migrating localStorage data:", error);
      toast.error("Error migrating your local data");
    }
  };

  const loadIdeas = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedIdeas = data.map(idea => ({
        id: idea.id,
        title: idea.title,
        description: idea.description || '',
        createdAt: idea.created_at,
        updatedAt: idea.updated_at,
        userId: idea.user_id,
      }));

      setIdeas(formattedIdeas);
    } catch (error) {
      toast.error("Failed to load ideas");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addIdea = async (title: string, description: string): Promise<Idea> => {
    if (!user) throw new Error("User not authenticated");
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ideas')
        .insert({
          title,
          description,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      const newIdea: Idea = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        userId: data.user_id,
      };

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
    if (!user) throw new Error("User not authenticated");
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ideas')
        .update({
          title,
          description,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedIdea: Idea = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        userId: data.user_id,
      };

      setIdeas(prev => prev.map(item => (item.id === id ? updatedIdea : item)));
      toast.success("Idea updated successfully");
      return updatedIdea;
    } catch (error) {
      toast.error("Failed to update idea");
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteIdea = async (id: string): Promise<void> => {
    if (!user) throw new Error("User not authenticated");
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('ideas')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setIdeas(prev => prev.filter(item => item.id !== id));
      toast.success("Idea deleted successfully");
    } catch (error) {
      toast.error("Failed to delete idea");
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
