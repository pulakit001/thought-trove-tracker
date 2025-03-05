
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
    <AnimatedContainer animation="fade" className="w-full relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter a title for your thought"
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
            placeholder="Describe your thought in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="min-h-[200px] resize-none enhanced-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <Input
              id="location"
              placeholder="Where did you have this thought?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 pl-10 enhanced-input"
            />
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate("/thoughts")}
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
                Save Thought
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

export default ThoughtForm;
