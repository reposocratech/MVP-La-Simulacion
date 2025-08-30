import { z } from "zod";

export const createEventStep1Schema = z.object({
  type_event: z
    .string()
    .nonempty("Debes seleccionar si es Evento o Taller"),

  event_title: z
    .string()
    .nonempty("El título no puede estar vacío")
    .max(100, "El título no puede superar los 100 caracteres"),

  event_description: z
    .string()
    .nonempty("La descripción no puede estar vacía")
    .max(350, "La descripción no puede superar los 350 caracteres"),

  location: z
    .string()
    .max(150, "La localización no puede superar los 150 caracteres")
    .optional(),
});
