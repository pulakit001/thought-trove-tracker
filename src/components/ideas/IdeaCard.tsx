
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Idea, useIdeas } from "@/contexts/IdeaContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { 
  Clock, Edit, Trash2, 
  AlertCircle, LucideLoader2
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IdeaCardProps {
  idea: Idea;
  delay?: number;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, delay = 0 }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { deleteIdea } = useIdeas();
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteIdea(idea.id);
    } catch (error) {
      console.error("Failed to delete idea:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="brutalist-card mb-4">
        <h3 className="font-mono text-lg font-bold uppercase tracking-wide mb-2">{idea.title}</h3>
        
        <div className="font-mono text-xs text-muted-foreground mb-4">
          [{formatDate(idea.createdAt)}]
        </div>
        
        <p className="font-mono text-sm mb-4">
          {idea.description}
        </p>
        
        <div className="flex gap-4 pt-4 border-t-2 border-foreground">
          <button
            className="brutalist-text-button text-xs"
            onClick={() => navigate(`/edit/${idea.id}`)}
          >
            EDIT
          </button>
          
          <button
            className="brutalist-text-button text-xs"
            onClick={() => setShowDeleteDialog(true)}
          >
            DELETE
          </button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-destructive" />
              Delete Idea
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{idea.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default IdeaCard;
