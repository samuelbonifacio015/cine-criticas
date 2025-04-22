import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ReviewForm } from "./ReviewForm";

interface NewReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewReviewModal({ isOpen, onClose }: NewReviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Nueva Reseña</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ReviewForm onSuccess={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
} 