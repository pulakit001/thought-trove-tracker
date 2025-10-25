
import React from "react";
import Header from "@/components/layout/Header";
import IdeaForm from "@/components/ideas/IdeaForm";

const NewIdea: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 page-container pb-24 overflow-y-auto">
        <div className="mb-8">
          <h1 className="font-mono text-2xl font-bold uppercase tracking-wide mb-2">CREATE NEW IDEA</h1>
          <p className="font-mono text-sm text-muted-foreground">
            [CAPTURE YOUR THOUGHTS BEFORE THEY DISAPPEAR]
          </p>
        </div>

        <div className="brutalist-container p-6">
          <IdeaForm mode="create" />
        </div>
      </main>
    </div>
  );
};

export default NewIdea;
