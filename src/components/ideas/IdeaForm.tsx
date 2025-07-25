
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useIdeas, Idea } from "@/contexts/IdeaContext";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { LucideLoader2, Save } from "lucide-react";
import VoiceRecorder from "@/components/ui/VoiceRecorder";
import { toast } from "sonner";

interface IdeaFormProps {
  mode: "create" | "edit";
  idea?: Idea;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ mode, idea }) => {
  const [title, setTitle] = useState(idea?.title || "");
  const [description, setDescription] = useState(idea?.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addIdea, updateIdea } = useIdeas();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (mode === "create") {
        await addIdea(title, description);
        navigate("/dashboard");
      } else if (mode === "edit" && idea) {
        await updateIdea(idea.id, title, description);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Failed to save idea:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const processTranscription = (text: string) => {
    if (!text) return;
    
    // Set the entire transcription as the description
    setDescription(text);
    
    // For the title, use a generic title with timestamp
    const now = new Date();
    setTitle(`Voice Note (${now.toLocaleTimeString()})`);
    
    toast.success("Voice recording transcribed");
    
    // Auto-save if in create mode
    if (mode === "create") {
      setTimeout(async () => {
        try {
          await addIdea(`Voice Note (${now.toLocaleTimeString()})`, text);
          toast.success("Idea saved automatically");
          navigate("/dashboard");
        } catch (error) {
          console.error("Failed to auto-save idea:", error);
          toast.error("Failed to auto-save. Please save manually.");
        }
      }, 1000);
    }
  };

  return (
    <div className="w-full relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="font-mono text-sm uppercase tracking-wide">TITLE:</label>
          <Input
            id="title"
            placeholder="[ enter a title for your idea ]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="font-mono text-sm uppercase tracking-wide">DESCRIPTION:</label>
          <Textarea
            id="description"
            placeholder="[ describe your idea in detail... ]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="min-h-[200px]"
          />
        </div>
        
        <div className="flex gap-4">
          <button 
            type="button" 
            className="brutalist-text-button"
            onClick={() => navigate("/dashboard")}
          >
            CANCEL
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="brutalist-text-button"
          >
            {isSubmitting ? "SAVING..." : "SAVE IDEA"}
          </button>
        </div>
      </form>
      
      {/* Voice recorder floating action button */}
      <div className="fixed bottom-20 right-4 z-50">
        <VoiceRecorder onTranscriptionComplete={processTranscription} />
      </div>
    </div>
  );
};

export default IdeaForm;
