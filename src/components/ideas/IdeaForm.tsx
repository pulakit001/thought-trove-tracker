
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
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length > 0) {
      // Use first sentence or portion as title (up to 60 chars)
      const titleText = sentences[0].trim();
      setTitle(titleText.length > 60 ? titleText.substring(0, 57) + "..." : titleText);
      
      // Use full text as description
      setDescription(text);
      
      toast.success("Voice recording transcribed successfully!");
      
      // Auto-save if in create mode
      if (mode === "create") {
        setTimeout(async () => {
          try {
            await addIdea(titleText.length > 60 ? titleText.substring(0, 57) + "..." : titleText, text);
            toast.success("Idea saved automatically!");
            navigate("/dashboard");
          } catch (error) {
            console.error("Failed to auto-save idea:", error);
            toast.error("Failed to auto-save. Please save manually.");
          }
        }, 1000);
      }
    }
  };

  return (
    <AnimatedContainer animation="fade" className="w-full relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter a title for your idea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="h-12 enhanced-input"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your idea in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="min-h-[200px] resize-none enhanced-input"
          />
        </div>
        
        <div className="flex items-center justify-end gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="px-6 enhanced-container"
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 enhanced-container"
          >
            {isSubmitting ? (
              <>
                <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Idea
              </>
            )}
          </Button>
        </div>
      </form>
      
      {/* Voice recorder floating action button */}
      <div className="fixed bottom-6 right-6 z-50">
        <VoiceRecorder onTranscriptionComplete={processTranscription} />
      </div>
    </AnimatedContainer>
  );
};

export default IdeaForm;
