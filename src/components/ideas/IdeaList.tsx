
import React, { useState } from "react";
import { useIdeas } from "@/contexts/IdeaContext";
import IdeaCard from "./IdeaCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const IdeaList: React.FC = () => {
  const { ideas, loading } = useIdeas();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredIdeas = ideas.filter(
    (idea) =>
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <RefreshCcw className="w-8 h-8 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading your ideas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatedContainer animation="fade" className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Button 
          onClick={() => navigate("/new")}
          className="h-12 px-6"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Idea
        </Button>
      </AnimatedContainer>

      {filteredIdeas.length === 0 ? (
        <AnimatedContainer 
          animation="fade" 
          delay={100}
          className="flex flex-col items-center justify-center h-60 text-center"
        >
          {searchQuery ? (
            <>
              <p className="text-muted-foreground mb-2">
                No ideas match your search
              </p>
              <Button 
                variant="ghost" 
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            </>
          ) : (
            <>
              <p className="text-lg mb-4">
                You don't have any ideas yet
              </p>
              <Button 
                onClick={() => navigate("/new")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create your first idea
              </Button>
            </>
          )}
        </AnimatedContainer>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredIdeas.map((idea, index) => (
            <IdeaCard 
              key={idea.id} 
              idea={idea} 
              delay={index * 50}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeaList;
