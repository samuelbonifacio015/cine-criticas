import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Review } from "@/types/review";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
}

interface ReviewCommentsProps {
  review: Review;
  onLike: (reviewId: string) => void;
  onComment: (reviewId: string, content: string) => void;
  onShare: (reviewId: string) => void;
}

export function ReviewComments({ review, onLike, onComment, onShare }: ReviewCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: "current-user", // Esto debería venir de un sistema de autenticación
      userName: "Usuario Actual",
      content: newComment,
      createdAt: new Date(),
    };

    setComments([...comments, comment]);
    setNewComment("");
    onComment(review.id, newComment);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(review.id);
  };

  const handleShare = () => {
    onShare(review.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant={isLiked ? "default" : "outline"}
          size="sm"
          onClick={handleLike}
          className="flex items-center gap-2"
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          <span>Me gusta</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          <span>Compartir</span>
        </Button>
      </div>

      <div className="space-y-4">
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={!newComment.trim()}>
            Comentar
          </Button>
        </form>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.userAvatar} />
                <AvatarFallback>{comment.userName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.userName}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 