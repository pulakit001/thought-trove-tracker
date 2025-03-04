
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
      <AnimatedContainer 
        animation="slide-up" 
        delay={delay} 
        className="card-hover"
      >
        <Card className="overflow-hidden border-border/40">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2 line-clamp-1">{idea.title}</h3>
            
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatDate(idea.createdAt)}</span>
            </div>
            
            <p className="text-foreground/80 line-clamp-3">
              {idea.description}
            </p>
          </CardContent>
          
          <CardFooter className="px-6 py-4 bg-muted/30 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/edit/${idea.id}`)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      </AnimatedContainer>

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
