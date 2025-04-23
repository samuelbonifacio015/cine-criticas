import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Review } from "@/types/review";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Film, Tv, Calendar, Edit, Trash2, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { deleteReview } from "@/services/reviewService";
import { ReviewComments } from "./ReviewComments";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getMovieDetails, getSeriesDetails, getPosterUrl, getYouTubeEmbedUrl, getStreamingProviders } from "@/services/tmdbService";

interface ReviewModalProps {
  review: Review;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ review, isOpen, onClose }: ReviewModalProps) {
  const navigate = useNavigate();
  const [tmdbData, setTmdbData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("info");
  
  useEffect(() => {
    if (review.tmdbId) {
      const fetchTmdbData = async () => {
        try {
          const data = review.type === "movie"
            ? await getMovieDetails(review.tmdbId)
            : await getSeriesDetails(review.tmdbId);
          setTmdbData(data);
        } catch (error) {
          console.error("Error fetching TMDB data:", error);
        }
      };
      fetchTmdbData();
    }
  }, [review.tmdbId, review.type]);

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

  const handleLike = (reviewId: string) => {
    // Implementar lógica de me gusta
    console.log("Like review:", reviewId);
  };

  const handleComment = (reviewId: string, content: string) => {
    // Implementar lógica de comentarios
    console.log("Comment on review:", reviewId, content);
  };

  const handleShare = (reviewId: string) => {
    // Implementar lógica de compartir
    const url = window.location.origin + `/review/${reviewId}`;
    navigator.clipboard.writeText(url);
    // Aquí podrías mostrar una notificación de éxito
  };

  const trailer = tmdbData?.videos?.results?.find(
    (video: any) => video.site === "YouTube" && video.type === "Trailer"
  );

  const streamingProviders = tmdbData ? getStreamingProviders(tmdbData["watch/providers"]) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="cast">Reparto</TabsTrigger>
            <TabsTrigger value="comments">Comentarios</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                  {streamingProviders && (
                    <div className="space-y-2">
                      <span className="text-muted-foreground">Disponible en:</span>
                      <div className="flex flex-wrap gap-2">
                        {streamingProviders.flatrate?.map((provider) => (
                          <Badge key={provider.provider_id} variant="secondary">
                            <img
                              src={getPosterUrl(provider.logo_path, "w92")}
                              alt={provider.provider_name}
                              className="h-4 w-4 mr-1"
                            />
                            {provider.provider_name}
                          </Badge>
                        ))}
                      </div>
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
          </TabsContent>

          <TabsContent value="media">
            {trailer && (
              <div className="aspect-video w-full mb-4">
                <iframe
                  src={getYouTubeEmbedUrl(trailer.key)}
                  title={trailer.name}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            )}
            {tmdbData?.backdrop_path && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={getPosterUrl(tmdbData.backdrop_path, "original")}
                  alt={review.title}
                  className="w-full h-auto"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="cast">
            {tmdbData?.credits && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Reparto Principal</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {tmdbData.credits.cast.slice(0, 8).map((actor: any) => (
                      <div key={actor.id} className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-2">
                          <img
                            src={getProfileUrl(actor.profile_path)}
                            alt={actor.name}
                            className="rounded-full w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-medium">{actor.name}</p>
                        <p className="text-sm text-muted-foreground">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Equipo Técnico</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tmdbData.credits.crew
                      .filter((member: any) => ["Director", "Creator", "Writer"].includes(member.job))
                      .slice(0, 6)
                      .map((member: any) => (
                        <div key={member.id} className="flex items-center gap-2">
                          <span className="font-medium">{member.name}</span>
                          <span className="text-muted-foreground">({member.job})</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comments">
            <ReviewComments
              review={review}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 