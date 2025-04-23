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
  tags?: string[];
  tmdbId?: number;
  likes?: number;
  comments?: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
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
  tmdbId?: number;
}
