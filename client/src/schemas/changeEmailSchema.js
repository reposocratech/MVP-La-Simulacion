import { z } from 'zod';

export const changeEmailSchema = z.object({
  email: z
    .string()
    .email({ message: "El email actual no es válido" })
    .max(100, { message: "El email no puede exceder los 100 caracteres" }),
  newEmail: z
    .string()
    .email({ message: "El nuevo email no es válido" })
    .max(100, { message: "El email no puede exceder los 100 caracteres" }),
  repeatNewEmail: z
    .string()
    .email({ message: "La confirmación del email no es válida" })
    .max(100, { message: "El email no puede exceder los 100 caracteres" }),
}).refine((data) => data.newEmail === data.repeatNewEmail, {
  message: "Los nuevos emails no coinciden",
  path: ["repeatNewEmail"],
});
