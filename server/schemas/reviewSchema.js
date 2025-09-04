import { z } from "zod";

export const reviewSchema = z.object({
  review_name: z
  .string()
  .max(50, "El nombre no puede tener más de 500 caracteres"),
  description: z
    .string()
    .max(350, "El comentario no puede tener más de 350 caracteres"),
  rating: z
  .number()
  .min(1 , "Debes rellenar la valoración")
  .max(5)
});