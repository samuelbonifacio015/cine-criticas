
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ReviewForm } from "@/components/ReviewForm";
import { getReviewById } from "@/services/reviewService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const EditReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const review = id ? getReviewById(id) : undefined;
  
  if (!review) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1 container py-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Reseña no encontrada</h2>
          <p className="text-muted-foreground mb-6">La reseña que buscas no existe o ha sido eliminada.</p>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">Editar Reseña</h1>
        <div className="bg-card rounded-lg shadow p-6">
          <ReviewForm initialData={review} />
        </div>
      </main>
    </div>
  );
};

export default EditReviewPage;
