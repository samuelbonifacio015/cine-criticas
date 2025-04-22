
import { FilmIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    to: string;
  };
}

export function EmptyState({
  title = "No hay reseñas todavía",
  description = "¡Comienza a añadir tus películas y series favoritas!",
  action = {
    label: "Añadir primera reseña",
    to: "/new",
  },
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
        <FilmIcon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
      <p className="mb-6 text-muted-foreground">{description}</p>
      {action && (
        <Button asChild>
          <Link to={action.to}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
