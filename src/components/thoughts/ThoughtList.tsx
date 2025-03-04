
import React, { useState } from "react";
import { useThoughts } from "@/contexts/ThoughtContext";
import ThoughtCard from "./ThoughtCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const ThoughtList: React.FC = () => {
  const { thoughts, loading } = useThoughts();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredThoughts = thoughts.filter(
    (thought) =>
      thought.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thought.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thought.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <RefreshCcw className="w-8 h-8 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading your thoughts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatedContainer animation="fade" className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search thoughts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Button 
          onClick={() => navigate("/new-thought")}
          className="h-12 px-6"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Thought
        </Button>
      </AnimatedContainer>

      {filteredThoughts.length === 0 ? (
        <AnimatedContainer 
          animation="fade" 
          delay={100}
          className="flex flex-col items-center justify-center h-60 text-center"
        >
          {searchQuery ? (
            <>
              <p className="text-muted-foreground mb-2">
                No thoughts match your search
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
                You don't have any thoughts yet
              </p>
              <Button 
                onClick={() => navigate("/new-thought")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create your first thought
              </Button>
            </>
          )}
        </AnimatedContainer>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredThoughts.map((thought, index) => (
            <ThoughtCard 
              key={thought.id} 
              thought={thought} 
              delay={index * 50}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThoughtList;
