import { z } from 'zod';

export const editProfileSchema = z.object({
  user_name: z
    .string({ message: 'El nombre es obligatorio' })
    .nonempty({ message: 'El nombre es obligatorio' })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(50, { message: 'El nombre no puede exceder los 50 caracteres' }),
  lastname: z
    .string({ message: 'El apellido es obligatorio' })
    .nonempty({ message: 'El apellido es obligatorio' })
    .min(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    .max(100, { message: 'El apellido no puede exceder los 100 caracteres' }),
  phone_number: z
    .string()
    .min(9, { message: 'El número de teléfono debe tener al menos 9 caracteres' })
    .max(15, { message: 'El número de teléfono no puede exceder los 15 caracteres' })
    .nullable()
    .optional(),
  specialty: z
    .string()
    .max(100, { message: 'La especialidad no puede exceder los 100 caracteres' })
    .nullable()
    .optional(),
});
