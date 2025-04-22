import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, Home, Plus, BarChart3 } from "lucide-react";
import { NewReviewModal } from "./NewReviewModal";

export function Navbar() {
  const [isNewReviewModalOpen, setIsNewReviewModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 w-full bg-card/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-6 w-6 text-cinema-red" />
          <span className="text-xl font-semibold">El Cine de Samuel</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
            <Home className="h-5 w-5" />
            <span className="hidden md:inline">Inicio</span>
          </Link>
          <Link to="/stats" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
            <BarChart3 className="h-5 w-5" />
            <span className="hidden md:inline">Estadísticas</span>
          </Link>
          <Button 
            onClick={() => setIsNewReviewModalOpen(true)}
            className="transition-transform hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span>Nueva Reseña</span>
          </Button>
        </nav>
      </div>

      <NewReviewModal 
        isOpen={isNewReviewModalOpen}
        onClose={() => setIsNewReviewModalOpen(false)}
      />
    </header>
  );
}
