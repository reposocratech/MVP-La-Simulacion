import { z } from "zod";

export const eventStep2Schema = z.object({
  duration: z
    .string()
    .max(50, "La duración no puede superar los 50 caracteres")
    .optional(),

  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha de inicio debe tener el formato YYYY-MM-DD")
    .optional(),

  end_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha de fin debe tener el formato YYYY-MM-DD")
    .optional(),

  start_hour: z
    .string()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "La hora de inicio no es válida")
    .optional(),

  end_hour: z
    .string()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "La hora de fin no es válida")
    .optional(),

  number_of_attendees: z
    .preprocess((val) => (val === "" ? undefined : Number(val)), 
      z.number()
       .int()
       .nonnegative("El número de asistentes no puede ser negativo")
       .max(16777215, "El número es demasiado grande")
    )
    .optional(),

  price: z
    .preprocess((val) => (val === "" ? undefined : Number(val)), 
      z.number()
       .nonnegative("El precio no puede ser negativo")
       .max(9999.99, "El precio no puede superar 9999.99")
    )
    .optional(),

  ticket_link: z
    .string()
    .url()
    .max(200, "El enlace no puede superar los 200 caracteres")
    .optional(),
});
