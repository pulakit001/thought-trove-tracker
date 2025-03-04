
import React from "react";
import Header from "@/components/layout/Header";
import ThoughtList from "@/components/thoughts/ThoughtList";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { useThoughts } from "@/contexts/ThoughtContext";

const Thoughts: React.FC = () => {
  const { thoughts } = useThoughts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <AnimatedContainer animation="fade" className="mb-8">
          <h1 className="text-3xl font-bold">My Thoughts</h1>
          <p className="text-muted-foreground">
            You have {thoughts.length} {thoughts.length === 1 ? "thought" : "thoughts"}
          </p>
        </AnimatedContainer>

        <ThoughtList />
      </main>
    </div>
  );
};

export default Thoughts;
