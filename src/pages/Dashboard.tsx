
import React from "react";
import Header from "@/components/layout/Header";
import IdeaList from "@/components/ideas/IdeaList";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { useIdeas } from "@/contexts/IdeaContext";

const Dashboard: React.FC = () => {
  const { ideas } = useIdeas();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8 pb-24 md:pb-8">
        <AnimatedContainer animation="fade" className="mb-8">
          <h1 className="text-3xl font-bold">My Ideas</h1>
          <p className="text-muted-foreground">
            You have {ideas.length} {ideas.length === 1 ? "idea" : "ideas"}
          </p>
        </AnimatedContainer>

        <IdeaList />
      </main>
    </div>
  );
};

export default Dashboard;
