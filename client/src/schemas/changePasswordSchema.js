import { z } from 'zod';

export const changePasswordSchema = z.object({
  prevPass: z.string().nonempty({ message: "La contraseña actual es obligatoria" }),
  newPass: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una mayúscula' })
    .regex(/[a-z]/, { message: 'La contraseña debe contener al menos una minúscula' })
    .regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número' })
    .regex(/[^a-zA-Z0-9]/, { message: 'La contraseña debe contener al menos un carácter especial' }),
  repPass: z.string().nonempty({ message: "Debes repetir la contraseña" }),
}).refine((data) => data.newPass === data.repPass, {
  message: "Las nuevas contraseñas no coinciden",
  path: ["repPass"],
});
