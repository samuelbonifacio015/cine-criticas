
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  totalStars?: number;
  initialRating?: number;
  size?: number;
  editable?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  totalStars = 5,
  initialRating = 0,
  size = 24,
  editable = true,
  onChange,
  className,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (selectedRating: number) => {
    if (!editable) return;
    setRating(selectedRating);
    onChange?.(selectedRating);
  };

  return (
    <div className={cn("flex", className)}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = hoverRating ? starValue <= hoverRating : starValue <= rating;

        return (
          <Star
            key={index}
            size={size}
            className={cn(
              "transition-all cursor-pointer",
              isFilled ? "fill-cinema-gold text-cinema-gold" : "text-gray-300",
              !editable && "cursor-default"
            )}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => editable && setHoverRating(starValue)}
            onMouseLeave={() => editable && setHoverRating(0)}
          />
        );
      })}
    </div>
  );
}
