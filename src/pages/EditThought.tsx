
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import ThoughtForm from "@/components/thoughts/ThoughtForm";
import { useThoughts, Thought } from "@/contexts/ThoughtContext";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { RefreshCcw } from "lucide-react";

const EditThought: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getThought } = useThoughts();
  const [thought, setThought] = useState<Thought | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      try {
        const foundThought = getThought(id);
        if (foundThought) {
          setThought(foundThought);
        } else {
          setError("Thought not found");
        }
      } catch (err) {
        setError("Failed to load thought");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, [id, getThought]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <RefreshCcw className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading thought...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !thought) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-muted-foreground mb-6">{error || "Thought not found"}</p>
            <button
              onClick={() => navigate("/thoughts")}
              className="text-primary hover:underline"
            >
              Back to Thoughts
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 page-container pb-24 overflow-y-auto">
        <div className="mb-8">
          <h1 className="font-mono text-2xl font-bold uppercase tracking-wide mb-2">EDIT THOUGHT</h1>
          <p className="font-mono text-sm text-muted-foreground">
            [UPDATE AND REFINE YOUR THOUGHT]
          </p>
        </div>

        <ThoughtForm mode="edit" thought={thought} />
      </main>
    </div>
  );
};

export default EditThought;
