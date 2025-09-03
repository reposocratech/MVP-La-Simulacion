import { z } from 'zod';

export const changeEmailSchema = z
  .object({
    email: z
      .string({ message: 'El email actual es obligatorio' })
      .nonempty({ message: 'El email actual es obligatorio' }),

    newEmail: z
      .string({ message: 'El nuevo email es obligatorio' })
      .nonempty({ message: 'El nuevo email es obligatorio' }),

    repeatNewEmail: z
      .string({ message: 'Debes confirmar tu nuevo email' })
      .nonempty({ message: 'Debes confirmar tu nuevo email' }),
  })
  .refine((data) => data.newEmail === data.repeatNewEmail, {
    message: 'El nuevo email y su confirmación no coinciden',
    path: ['repeatNewEmail'],
  });
