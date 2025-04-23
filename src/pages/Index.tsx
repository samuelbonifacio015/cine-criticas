import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Search, Tv } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { EmptyState } from "@/components/EmptyState";
import { ReviewCard } from "@/components/ReviewCard";
import { getAllReviews } from "@/services/reviewService";
import { Review } from "@/types/review";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const reviews = getAllReviews();
  
  const filteredReviews = reviews.filter((review) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      review.title.toLowerCase().includes(searchLower) ||
      (review.director && review.director.toLowerCase().includes(searchLower)) ||
      review.review.toLowerCase().includes(searchLower) ||
      review.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });
  
  const filterByType = (type: "movie" | "series") => {
    return filteredReviews.filter((review) => review.type === type);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por título, director, contenido o etiquetas..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="movies" className="flex items-center gap-1">
              <Film className="h-4 w-4" />
              <span>Películas</span>
            </TabsTrigger>
            <TabsTrigger value="series" className="flex items-center gap-1">
              <Tv className="h-4 w-4" />
              <span>Series</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {filteredReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <EmptyState
                title={reviews.length > 0 ? "No se encontraron resultados" : "No hay reseñas todavía"}
                description={
                  reviews.length > 0
                    ? "Intenta con otros términos de búsqueda"
                    : "¡Comienza a añadir tus películas y series favoritas!"
                }
              />
            )}
          </TabsContent>
          
          <TabsContent value="movies">
            {filterByType("movie").length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterByType("movie").map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No hay películas todavía"
                description="¡Añade tu primera película!"
              />
            )}
          </TabsContent>
          
          <TabsContent value="series">
            {filterByType("series").length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterByType("series").map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No hay series todavía"
                description="¡Añade tu primera serie!"
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default HomePage;
