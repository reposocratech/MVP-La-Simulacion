import { z } from 'zod';

export const changeEmailSchema = z.object({
  email: z.string().email({ message: "El email actual no es válido" }),
  newEmail: z.string().email({ message: "El nuevo email no es válido" }),
  repeatNewEmail: z.string().email({ message: "La confirmación del email no es válida" }),
}).refine((data) => data.newEmail === data.repeatNewEmail, {
  message: "Los nuevos emails no coinciden",
  path: ["repeatNewEmail"],
});
