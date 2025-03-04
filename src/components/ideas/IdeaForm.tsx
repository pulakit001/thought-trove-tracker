
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useIdeas, Idea } from "@/contexts/IdeaContext";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { LucideLoader2, Save } from "lucide-react";

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

  return (
    <AnimatedContainer animation="fade" className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter a title for your idea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="h-12"
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
            className="min-h-[200px] resize-none"
          />
        </div>
        
        <div className="flex items-center justify-end gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="px-6"
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6"
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
    </AnimatedContainer>
  );
};

export default IdeaForm;
