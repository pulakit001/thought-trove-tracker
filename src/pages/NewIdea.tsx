
import React from "react";
import Header from "@/components/layout/Header";
import IdeaForm from "@/components/ideas/IdeaForm";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const NewIdea: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <AnimatedContainer animation="fade" className="mb-8">
          <h1 className="text-3xl font-bold">Create New Idea</h1>
          <p className="text-muted-foreground">
            Capture your thoughts before they disappear
          </p>
        </AnimatedContainer>

        <IdeaForm mode="create" />
      </main>
    </div>
  );
};

export default NewIdea;
