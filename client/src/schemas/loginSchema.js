import {z} from 'zod';

export const loginSchema = z.object({
  email: z
    .email({message: "El email es obligatorio"})
    .max(100, {message: "El email tiene un máximo de 100 caracteres"}),
  password: z
    .string({message: "La contraseña es obligatoria"})
    .max(20, {message: "La contraseña tiene que tener un máximo de 20 caracteres"})
});