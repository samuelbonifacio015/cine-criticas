import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/StarRating";
import { Film, Tv } from "lucide-react";
import { Review } from "@/types/review";
import { cn } from "@/lib/utils";
import { ReviewModal } from "./ReviewModal";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date instanceof Date ? date : new Date(date));
  };

  return (
    <>
      <Card 
        className={cn(
          "overflow-hidden cursor-pointer transition-all duration-300",
          "hover:shadow-xl hover:-translate-y-1",
          "active:scale-95",
          "group",
          className
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <div>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2 group-hover:text-cinema-red transition-colors">
                  {review.type === "movie" ? (
                    <Film className="h-5 w-5 text-cinema-red" />
                  ) : (
                    <Tv className="h-5 w-5 text-cinema-red" />
                  )}
                  {review.title}
                </CardTitle>
                <CardDescription>
                  {review.year}
                  {review.director && ` • ${review.director}`}
                </CardDescription>
              </div>
              <StarRating initialRating={review.rating} editable={false} size={16} />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            {review.imageUrl && (
              <div className="w-full h-40 mb-4 overflow-hidden rounded">
                <img 
                  src={review.imageUrl} 
                  alt={review.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}
            <p className="text-sm line-clamp-3 group-hover:text-foreground/90 transition-colors">{review.review}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex flex-wrap gap-2 justify-between">
            <div className="flex flex-wrap gap-2">
              {review.tags?.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-cinema-darkGray text-white transition-colors group-hover:bg-cinema-red"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDate(review.dateWatched)}
            </span>
          </CardFooter>
        </div>
      </Card>

      <ReviewModal 
        review={review} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
