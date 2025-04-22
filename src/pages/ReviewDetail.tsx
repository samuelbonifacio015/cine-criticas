
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Film, Tv, Calendar, Edit, Trash2, ArrowLeft } from "lucide-react";
import { deleteReview, getReviewById } from "@/services/reviewService";
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
import { cn } from "@/lib/utils";

const ReviewDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const review = id ? getReviewById(id) : undefined;
  
  if (!review) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1 container py-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Reseña no encontrada</h2>
          <p className="text-muted-foreground mb-6">La reseña que buscas no existe o ha sido eliminada.</p>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </main>
      </div>
    );
  }
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date instanceof Date ? date : new Date(date));
  };
  
  const handleDelete = () => {
    if (id) {
      deleteReview(id);
      navigate("/");
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {review.imageUrl ? (
              <div className="rounded-lg overflow-hidden shadow-lg mb-4">
                <img
                  src={review.imageUrl}
                  alt={review.title}
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="bg-muted rounded-lg flex items-center justify-center h-80 mb-4">
                {review.type === "movie" ? (
                  <Film className="h-20 w-20 text-muted-foreground/30" />
                ) : (
                  <Tv className="h-20 w-20 text-muted-foreground/30" />
                )}
              </div>
            )}
            
            <div className="bg-card rounded-lg shadow p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Detalles</h2>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/edit/${review.id}`)}
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
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Tipo:</span>
                  <span className="flex items-center gap-1">
                    {review.type === "movie" ? (
                      <>
                        <Film className="h-4 w-4" />
                        <span>Película</span>
                      </>
                    ) : (
                      <>
                        <Tv className="h-4 w-4" />
                        <span>Serie</span>
                      </>
                    )}
                  </span>
                </div>
                
                {review.year && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Año:</span>
                    <span>{review.year}</span>
                  </div>
                )}
                
                {review.director && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Director:</span>
                    <span>{review.director}</span>
                  </div>
                )}
                
                {review.dateWatched && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Visto el:</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(review.dateWatched)}</span>
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Creado el:</span>
                  <span>{formatDate(review.createdAt)}</span>
                </div>
              </div>
              
              {review.tags && review.tags.length > 0 && (
                <div className="pt-2">
                  <span className="text-sm text-muted-foreground mb-2 block">Etiquetas:</span>
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl font-bold">{review.title}</h1>
                <StarRating
                  initialRating={review.rating}
                  editable={false}
                  size={28}
                  className="md:self-start"
                />
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className={cn(
                  "whitespace-pre-line",
                  "text-foreground"
                )}>
                  {review.review}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewDetailPage;
