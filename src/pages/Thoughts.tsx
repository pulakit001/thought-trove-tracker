
import React from "react";
import Header from "@/components/layout/Header";
import ThoughtList from "@/components/thoughts/ThoughtList";
import { useThoughts } from "@/contexts/ThoughtContext";

const Thoughts: React.FC = () => {
  const { thoughts } = useThoughts();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 page-container pb-24 overflow-y-auto">
        <div className="mb-8">
          <h1 className="font-mono text-2xl font-bold uppercase tracking-wide mb-2">MY THOUGHTS</h1>
          <p className="font-mono text-sm text-muted-foreground">
            [{thoughts.length} {thoughts.length === 1 ? "THOUGHT" : "THOUGHTS"}]
          </p>
        </div>

        <ThoughtList />
      </main>
    </div>
  );
};

export default Thoughts;
