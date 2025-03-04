
import React from "react";
import Header from "@/components/layout/Header";
import ThoughtForm from "@/components/thoughts/ThoughtForm";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const NewThought: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <AnimatedContainer animation="fade" className="mb-8">
          <h1 className="text-3xl font-bold">Create New Thought</h1>
          <p className="text-muted-foreground">
            Capture your thoughts with location details
          </p>
        </AnimatedContainer>

        <ThoughtForm mode="create" />
      </main>
    </div>
  );
};

export default NewThought;
