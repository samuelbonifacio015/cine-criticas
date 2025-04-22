import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarRating } from "@/components/StarRating";
import { addReview, updateReview } from "@/services/reviewService";
import { Review, ReviewFormData } from "@/types/review";
import { Trash2, X } from "lucide-react";
import { Badge } from "./ui/badge";

const reviewSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  type: z.enum(["movie", "series"]),
  director: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear()).optional(),
  rating: z.number().min(1).max(5),
  review: z.string().min(1, "La reseña es obligatoria"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  dateWatched: z.date().optional(),
  tags: z.array(z.string()).optional(),
});

interface ReviewFormProps {
  initialData?: Review;
  onSuccess?: () => void;
}

export function ReviewForm({ initialData, onSuccess }: ReviewFormProps) {
  const navigate = useNavigate();
  const [newTag, setNewTag] = useState("");
  
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: initialData || {
      title: "",
      type: "movie",
      director: "",
      year: new Date().getFullYear(),
      rating: 0,
      review: "",
      imageUrl: "",
      tags: [],
    },
  });
  
  const handleSubmit = (data: ReviewFormData) => {
    if (initialData?.id) {
      updateReview(initialData.id, data);
    } else {
      addReview(data);
    }
    
    if (onSuccess) {
      onSuccess();
    } else {
      navigate("/");
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título de la película o serie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="movie">Película</SelectItem>
                      <SelectItem value="series">Serie</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="director"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Director</FormLabel>
                    <FormControl>
                      <Input placeholder="Director" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Año" 
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen</FormLabel>
                  <div className="space-y-4">
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </FormControl>
                    {field.value && (
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <img
                          src={field.value}
                          alt="Preview"
                          className="object-cover w-full h-full transition-all hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400?text=Error+al+cargar+imagen";
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => field.onChange("")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <FormDescription className="flex flex-col gap-2">
                      <p>URL de la imagen del póster o carátula</p>
                      <p className="text-xs">Sugerencias para encontrar imágenes:</p>
                      <ul className="list-disc list-inside text-xs space-y-1">
                        <li>Busca en IMDB o The Movie Database (TMDB)</li>
                        <li>Usa Google Imágenes con el filtro "Grandes"</li>
                        <li>Asegúrate de que la URL termine en .jpg, .png o similar</li>
                      </ul>
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dateWatched"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de visionado</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().substring(0, 10) : ""}
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calificación</FormLabel>
                  <FormControl>
                    <StarRating 
                      initialRating={field.value} 
                      onChange={field.onChange}
                      className="py-2" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reseña</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Escribe tu opinión sobre la película o serie..." 
                      className="min-h-[200px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiquetas</FormLabel>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => {
                              const newTags = field.value?.filter((_, i) => i !== index);
                              field.onChange(newTags);
                            }}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="Nueva etiqueta"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (newTag.trim()) {
                                const newTags = [...(field.value || []), newTag.trim()];
                                field.onChange(newTags);
                                setNewTag("");
                              }
                            }
                          }}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          if (newTag.trim()) {
                            const newTags = [...(field.value || []), newTag.trim()];
                            field.onChange(newTags);
                            setNewTag("");
                          }
                        }}
                      >
                        Añadir
                      </Button>
                    </div>
                    <FormDescription>
                      Añade etiquetas para categorizar la reseña (ej: Acción, Drama, Netflix)
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button type="submit">
            {initialData ? "Actualizar" : "Guardar"} reseña
          </Button>
        </div>
      </form>
    </Form>
  );
}
