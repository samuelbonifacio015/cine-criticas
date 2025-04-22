
import { Review, ReviewFormData } from "@/types/review";

// Simular una base de datos local usando localStorage
const STORAGE_KEY = "movie-reviews";

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
export const getAllReviews = (): Review[] => {
  return loadReviews();
};

// Obtener una reseña por ID
export const getReviewById = (id: string): Review | undefined => {
  const reviews = loadReviews();
  return reviews.find((review) => review.id === id);
};

// Agregar una nueva reseña
export const addReview = (reviewData: ReviewFormData): Review => {
  const reviews = loadReviews();
  
  const newReview: Review = {
    ...reviewData,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  };
  
  reviews.unshift(newReview); // Agregar al principio para mostrar las más recientes primero
  saveReviews(reviews);
  
  return newReview;
};

// Actualizar una reseña existente
export const updateReview = (id: string, reviewData: ReviewFormData): Review | null => {
  const reviews = loadReviews();
  const index = reviews.findIndex((review) => review.id === id);
  
  if (index === -1) return null;
  
  const updatedReview: Review = {
    ...reviews[index],
    ...reviewData,
  };
  
  reviews[index] = updatedReview;
  saveReviews(reviews);
  
  return updatedReview;
};

// Eliminar una reseña
export const deleteReview = (id: string): boolean => {
  const reviews = loadReviews();
  const filteredReviews = reviews.filter((review) => review.id !== id);
  
  if (filteredReviews.length === reviews.length) return false;
  
  saveReviews(filteredReviews);
  return true;
};

// Obtener estadísticas básicas
export const getStats = () => {
  const reviews = loadReviews();
  
  return {
    total: reviews.length,
    movies: reviews.filter(r => r.type === "movie").length,
    series: reviews.filter(r => r.type === "series").length,
    avgRating: reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0
  };
};
