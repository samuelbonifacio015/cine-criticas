
export interface Review {
  id: string;
  title: string;
  type: "movie" | "series";
  director?: string;
  year?: number;
  rating: number;
  review: string;
  imageUrl?: string;
  dateWatched?: Date;
  createdAt: Date;
  tags?: string[];
}

export interface ReviewFormData {
  title: string;
  type: "movie" | "series";
  director?: string;
  year?: number;
  rating: number;
  review: string;
  imageUrl?: string;
  dateWatched?: Date;
  tags?: string[];
}
