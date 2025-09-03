import { z } from 'zod';

export const editProfileSchema = z.object({
  user_name: z
    .string()
    .trim()
    .nonempty({ message: "El nombre es obligatorio" })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres" }),

  lastname: z
    .string()
    .trim()
    .nonempty({ message: "Los apellidos son obligatorios" })
    .max(100, { message: "Los apellidos no pueden exceder los 100 caracteres" }),

  phone_number: z
    .string()
    .trim()
    .max(30, { message: "El teléfono no puede exceder los 30 caracteres" })
    .optional()
    .nullable(),

  specialty: z
    .string()
    .trim()
    .max(100, { message: "La especialidad no puede exceder los 100 caracteres" })
    .optional()
    .nullable(),
});
