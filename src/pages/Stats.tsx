
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Star, Tv, CalendarDays } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getAllReviews, getStats } from "@/services/reviewService";
import { StarRating } from "@/components/StarRating";

const StatsPage = () => {
  const stats = getStats();
  const reviews = getAllReviews();
  
  // Calcular las películas y series mejor valoradas
  const topMovies = reviews
    .filter((r) => r.type === "movie")
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
    
  const topSeries = reviews
    .filter((r) => r.type === "series")
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  
  // Calcular distribución de calificaciones
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    const ratingIndex = Math.floor(review.rating) - 1;
    if (ratingIndex >= 0 && ratingIndex < 5) {
      ratingDistribution[ratingIndex]++;
    }
  });
  
  const maxRatingCount = Math.max(...ratingDistribution);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-6">Estadísticas</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reseñas
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                reseñas en tu colección
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Películas
              </CardTitle>
              <Film className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.movies}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.movies / stats.total) * 100 || 0).toFixed(0)}% de tus reseñas
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Series
              </CardTitle>
              <Tv className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.series}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.series / stats.total) * 100 || 0).toFixed(0)}% de tus reseñas
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Calificación Media
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats.avgRating.toFixed(1)}
              </div>
              <div className="pt-1">
                <StarRating
                  initialRating={stats.avgRating}
                  editable={false}
                  size={16}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Calificaciones</CardTitle>
              <CardDescription>
                Cantidad de reseñas por cada nivel de calificación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ratingDistribution.map((count, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{index + 1}</span>
                      <StarRating
                        initialRating={index + 1}
                        editable={false}
                        size={16}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {count} {count === 1 ? "reseña" : "reseñas"}
                    </span>
                  </div>
                  <Progress 
                    value={maxRatingCount ? (count / maxRatingCount) * 100 : 0} 
                    className="h-2" 
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  Top Películas
                </CardTitle>
                <CardDescription>
                  Tus películas mejor valoradas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {topMovies.length > 0 ? (
                  <ul className="space-y-3">
                    {topMovies.map((movie) => (
                      <li
                        key={movie.id}
                        className="flex justify-between items-center pb-2 border-b last:border-0"
                      >
                        <span className="font-medium">{movie.title}</span>
                        <StarRating
                          initialRating={movie.rating}
                          editable={false}
                          size={16}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Aún no has reseñado ninguna película
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tv className="h-5 w-5" />
                  Top Series
                </CardTitle>
                <CardDescription>
                  Tus series mejor valoradas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {topSeries.length > 0 ? (
                  <ul className="space-y-3">
                    {topSeries.map((series) => (
                      <li
                        key={series.id}
                        className="flex justify-between items-center pb-2 border-b last:border-0"
                      >
                        <span className="font-medium">{series.title}</span>
                        <StarRating
                          initialRating={series.rating}
                          editable={false}
                          size={16}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Aún no has reseñado ninguna serie
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatsPage;
