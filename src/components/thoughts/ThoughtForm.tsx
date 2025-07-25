
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useThoughts, Thought } from "@/contexts/ThoughtContext";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { LucideLoader2, Save, MapPin } from "lucide-react";
import VoiceRecorder from "@/components/ui/VoiceRecorder";
import { toast } from "sonner";

interface ThoughtFormProps {
  mode: "create" | "edit";
  thought?: Thought;
}

const ThoughtForm: React.FC<ThoughtFormProps> = ({ mode, thought }) => {
  const [title, setTitle] = useState(thought?.title || "");
  const [description, setDescription] = useState(thought?.description || "");
  const [location, setLocation] = useState(thought?.location || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addThought, updateThought } = useThoughts();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (mode === "create") {
        await addThought(title, description, location);
        navigate("/thoughts");
      } else if (mode === "edit" && thought) {
        await updateThought(thought.id, title, description, location);
        navigate("/thoughts");
      }
    } catch (error) {
      console.error("Failed to save thought:", error);
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
          await addThought(
            `Voice Note (${now.toLocaleTimeString()})`, 
            text, 
            location
          );
          toast.success("Thought saved automatically");
          navigate("/thoughts");
        } catch (error) {
          console.error("Failed to auto-save thought:", error);
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
            placeholder="[ enter a title for your thought ]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="font-mono text-sm uppercase tracking-wide">DESCRIPTION:</label>
          <Textarea
            id="description"
            placeholder="[ describe your thought in detail... ]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="min-h-[200px]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="font-mono text-sm uppercase tracking-wide">LOCATION:</label>
          <Input
            id="location"
            placeholder="[ where did you have this thought? ]"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <button 
            type="button" 
            className="brutalist-text-button"
            onClick={() => navigate("/thoughts")}
          >
            CANCEL
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="brutalist-text-button"
          >
            {isSubmitting ? "SAVING..." : "SAVE THOUGHT"}
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

export default ThoughtForm;
