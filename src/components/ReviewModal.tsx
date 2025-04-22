import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Review } from "@/types/review";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Film, Tv, Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { deleteReview } from "@/services/reviewService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ReviewModalProps {
  review: Review;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ review, isOpen, onClose }: ReviewModalProps) {
  const navigate = useNavigate();
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date instanceof Date ? date : new Date(date));
  };

  const handleDelete = () => {
    deleteReview(review.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {review.type === "movie" ? (
              <Film className="h-6 w-6 text-cinema-red" />
            ) : (
              <Tv className="h-6 w-6 text-cinema-red" />
            )}
            {review.title}
          </DialogTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                onClose();
                navigate(`/edit/${review.id}`);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción eliminará permanentemente tu reseña de "{review.title}".
                    Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-1">
            {review.imageUrl ? (
              <div className="rounded-lg overflow-hidden shadow-lg mb-4">
                <img
                  src={review.imageUrl}
                  alt={review.title}
                  className="w-full h-auto transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : (
              <div className="bg-muted rounded-lg flex items-center justify-center h-48 mb-4">
                {review.type === "movie" ? (
                  <Film className="h-16 w-16 text-muted-foreground/30" />
                ) : (
                  <Tv className="h-16 w-16 text-muted-foreground/30" />
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Calificación:</span>
                <StarRating initialRating={review.rating} editable={false} size={20} />
              </div>

              {review.director && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Director:</span>
                  <span>{review.director}</span>
                </div>
              )}

              {review.year && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Año:</span>
                  <span>{review.year}</span>
                </div>
              )}

              {review.dateWatched && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Visto el:</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(review.dateWatched)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="whitespace-pre-line text-foreground">{review.review}</p>
            </div>

            {review.tags && review.tags.length > 0 && (
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-cinema-darkGray text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 