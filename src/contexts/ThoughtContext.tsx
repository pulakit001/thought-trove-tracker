
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
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

export const ThoughtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, isAuthenticated } = useAuth();

  // Load thoughts when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadThoughts();
      migrateLocalStorageData();
    } else {
      setThoughts([]);
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const migrateLocalStorageData = async () => {
    try {
      const storedThoughts = localStorage.getItem("thoughts");
      if (storedThoughts && user) {
        const parsedThoughts: Record<string, Thought> = JSON.parse(storedThoughts);
        const thoughtsArray = Object.values(parsedThoughts);
        
        if (thoughtsArray.length > 0) {
          console.log("Migrating", thoughtsArray.length, "thoughts from localStorage to Supabase");
          
          for (const thought of thoughtsArray) {
            // Check if thought already exists in Supabase
            const { data: existingThought } = await supabase
              .from('thoughts')
              .select('id')
              .eq('title', thought.title)
              .eq('description', thought.description)
              .single();
            
            if (!existingThought) {
              await supabase.from('thoughts').insert({
                title: thought.title,
                description: thought.description,
                location: thought.location,
                user_id: user.id,
                created_at: thought.createdAt,
                updated_at: thought.updatedAt,
              });
            }
          }
          
          // Clear localStorage after successful migration
          localStorage.removeItem("thoughts");
          toast.success("Successfully migrated your thoughts to the cloud!");
          
          // Reload thoughts to show migrated data
          loadThoughts();
        }
      }
    } catch (error) {
      console.error("Error migrating localStorage data:", error);
      toast.error("Error migrating your local data");
    }
  };

  const loadThoughts = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('thoughts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedThoughts = data.map(thought => ({
        id: thought.id,
        title: thought.title,
        description: thought.description || '',
        location: thought.location || '',
        createdAt: thought.created_at,
        updatedAt: thought.updated_at,
        userId: thought.user_id,
      }));

      setThoughts(formattedThoughts);
    } catch (error) {
      toast.error("Failed to load thoughts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addThought = async (title: string, description: string, location: string): Promise<Thought> => {
    if (!user) throw new Error("User not authenticated");
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('thoughts')
        .insert({
          title,
          description,
          location,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      const newThought: Thought = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        location: data.location || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        userId: data.user_id,
      };

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
    if (!user) throw new Error("User not authenticated");
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('thoughts')
        .update({
          title,
          description,
          location,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedThought: Thought = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        location: data.location || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        userId: data.user_id,
      };

      setThoughts(prev => prev.map(item => (item.id === id ? updatedThought : item)));
      toast.success("Thought updated successfully");
      return updatedThought;
    } catch (error) {
      toast.error("Failed to update thought");
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteThought = async (id: string): Promise<void> => {
    if (!user) throw new Error("User not authenticated");
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('thoughts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setThoughts(prev => prev.filter(item => item.id !== id));
      toast.success("Thought deleted successfully");
    } catch (error) {
      toast.error("Failed to delete thought");
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
