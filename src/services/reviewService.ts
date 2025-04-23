import { Review, ReviewFormData } from "@/types/review";

// Simular una base de datos local usando localStorage
const STORAGE_KEY = "reviews";

// Importamos reseñas de ejemplo
import { sampleReviews } from "@/data/sampleReviews";

// Inicializamos el almacenamiento local con ejemplos si está vacío
const initializeStorage = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleReviews));
  }
};

// Inicializamos cuando se carga el servicio
initializeStorage();

// Cargar reseñas del almacenamiento local
const loadReviews = (): Review[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      // Convertir las fechas de string a objetos Date
      return JSON.parse(saved, (key, value) => {
        if (key === "dateWatched" || key === "createdAt") {
          return value ? new Date(value) : null;
        }
        return value;
      });
    } catch (e) {
      console.error("Error loading reviews:", e);
      return [];
    }
  }
  return [];
};

// Guardar reseñas en el almacenamiento local
const saveReviews = (reviews: Review[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
};

// Obtener todas las reseñas
export function getAllReviews(): Review[] {
  const reviews = localStorage.getItem(STORAGE_KEY);
  return reviews ? JSON.parse(reviews) : [];
}

// Obtener una reseña por ID
export function getReviewById(id: string): Review | undefined {
  const reviews = getAllReviews();
  return reviews.find((review) => review.id === id);
}

// Agregar una nueva reseña
export function addReview(data: ReviewFormData): Review {
  const reviews = getAllReviews();
  const newReview: Review = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    likes: 0,
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  reviews.push(newReview);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  return newReview;
}

// Actualizar una reseña existente
export function updateReview(id: string, data: ReviewFormData): Review {
  const reviews = getAllReviews();
  const index = reviews.findIndex((review) => review.id === id);
  
  if (index === -1) {
    throw new Error("Review not found");
  }
  
  const updatedReview: Review = {
    ...reviews[index],
    ...data,
    updatedAt: new Date(),
  };
  
  reviews[index] = updatedReview;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  return updatedReview;
}

// Eliminar una reseña
export function deleteReview(id: string): void {
  const reviews = getAllReviews();
  const filteredReviews = reviews.filter((review) => review.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredReviews));
}

// Obtener estadísticas básicas
export const getStats = () => {
  const reviews = getAllReviews();
  
  return {
    total: reviews.length,
    movies: reviews.filter(r => r.type === "movie").length,
    series: reviews.filter(r => r.type === "series").length,
    avgRating: reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0
  };
};

export function likeReview(id: string): Review {
  const reviews = getAllReviews();
  const index = reviews.findIndex((review) => review.id === id);
  
  if (index === -1) {
    throw new Error("Review not found");
  }
  
  const updatedReview: Review = {
    ...reviews[index],
    likes: (reviews[index].likes || 0) + 1,
    updatedAt: new Date(),
  };
  
  reviews[index] = updatedReview;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  return updatedReview;
}

export function addComment(id: string, comment: Omit<Comment, "id" | "createdAt">): Review {
  const reviews = getAllReviews();
  const index = reviews.findIndex((review) => review.id === id);
  
  if (index === -1) {
    throw new Error("Review not found");
  }
  
  const newComment: Comment = {
    ...comment,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
  };
  
  const updatedReview: Review = {
    ...reviews[index],
    comments: [...(reviews[index].comments || []), newComment],
    updatedAt: new Date(),
  };
  
  reviews[index] = updatedReview;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  return updatedReview;
}

export function deleteComment(reviewId: string, commentId: string): Review {
  const reviews = getAllReviews();
  const index = reviews.findIndex((review) => review.id === reviewId);
  
  if (index === -1) {
    throw new Error("Review not found");
  }
  
  const updatedReview: Review = {
    ...reviews[index],
    comments: (reviews[index].comments || []).filter((comment) => comment.id !== commentId),
    updatedAt: new Date(),
  };
  
  reviews[index] = updatedReview;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  return updatedReview;
}

export function getReviewsByTag(tag: string): Review[] {
  const reviews = getAllReviews();
  return reviews.filter((review) => review.tags?.includes(tag));
}

export function getReviewsByType(type: "movie" | "series"): Review[] {
  const reviews = getAllReviews();
  return reviews.filter((review) => review.type === type);
}

export function getReviewsByYear(year: number): Review[] {
  const reviews = getAllReviews();
  return reviews.filter((review) => review.year === year);
}

export function getReviewsByRating(minRating: number, maxRating: number): Review[] {
  const reviews = getAllReviews();
  return reviews.filter((review) => review.rating >= minRating && review.rating <= maxRating);
}

export function getMostLikedReviews(limit: number = 5): Review[] {
  const reviews = getAllReviews();
  return [...reviews]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, limit);
}

export function getMostCommentedReviews(limit: number = 5): Review[] {
  const reviews = getAllReviews();
  return [...reviews]
    .sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
    .slice(0, limit);
}

export function getRecentReviews(limit: number = 5): Review[] {
  const reviews = getAllReviews();
  return [...reviews]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}
