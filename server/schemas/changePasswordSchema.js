import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    prevPass: z
      .string({ message: 'La contraseña actual es obligatoria' })
      .nonempty({ message: 'La contraseña actual es obligatoria' }),
    newPass: z
      .string({ message: 'La nueva contraseña es obligatoria' })
      .nonempty({ message: 'La nueva contraseña es obligatoria' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
      .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una mayúscula' })
      .regex(/[a-z]/, { message: 'La contraseña debe contener al menos una minúscula' })
      .regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número' })
      .regex(/[^a-zA-Z0-9]/, { message: 'La contraseña debe contener al menos un carácter especial' }),
    repPass: z
      .string({ message: 'Debes confirmar la nueva contraseña' })
      .nonempty({ message: 'Debes confirmar la nueva contraseña' }),
  })
  .refine((data) => data.newPass === data.repPass, {
    message: 'La nueva contraseña y la confirmación no coinciden',
    path: ['repPass'],
  });
