import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <Film className="h-20 w-20 text-cinema-red mb-6" />
        <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
        <p className="text-xl text-muted-foreground mb-8">
          La página que estás buscando no existe o ha sido eliminada.
        </p>
        <Button asChild size="lg">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </main>
    </div>
  );
};

export default NotFound;
