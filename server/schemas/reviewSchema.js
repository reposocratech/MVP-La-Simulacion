import { z } from "zod";

export const reviewSchema = z.object({
  comment: z
    .string()
    .max(350, "El comentario no puede tener más de 350 caracteres")
    .optional(),
  rating: z
  .number()
  .min(1 , "Debes rellenar la valoración")
  .max(5)
});