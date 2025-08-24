import { z } from 'zod';

export const editProfileSchema = z.object({
  user_name: z
    .string()
    .nonempty({ message: "El nombre es obligatorio" })
    .max(150, { message: "El nombre no puede exceder los 150 caracteres" }),
  lastname: z
    .string()
    .nonempty({ message: "Los apellidos son obligatorios" })
    .max(150, { message: "Los apellidos no pueden exceder los 150 caracteres" }),
  phone_number: z
    .string()
    .nullable()
    .optional(),
  specialty: z
    .string()
    .nullable()
    .optional(),
});
