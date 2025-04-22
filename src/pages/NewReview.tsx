
import { Navbar } from "@/components/Navbar";
import { ReviewForm } from "@/components/ReviewForm";

const NewReviewPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-6">Nueva Reseña</h1>
        <div className="bg-card rounded-lg shadow p-6">
          <ReviewForm />
        </div>
      </main>
    </div>
  );
};

export default NewReviewPage;
