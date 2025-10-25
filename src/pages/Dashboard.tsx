
import React from "react";
import Header from "@/components/layout/Header";
import IdeaList from "@/components/ideas/IdeaList";
import { useIdeas } from "@/contexts/IdeaContext";

const Dashboard: React.FC = () => {
  const { ideas } = useIdeas();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 page-container pb-24 overflow-y-auto">
        <div className="mb-8">
          <h1 className="font-mono text-2xl font-bold uppercase tracking-wide mb-2">MY IDEAS</h1>
          <p className="font-mono text-sm text-muted-foreground">
            [{ideas.length} {ideas.length === 1 ? "IDEA" : "IDEAS"}]
          </p>
        </div>

        <IdeaList />
      </main>
    </div>
  );
};

export default Dashboard;
