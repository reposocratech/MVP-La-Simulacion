import {z} from 'zod';

export const createRoomSchema2 = z.object({
  pricing: z
    .string()
    .max(500, {message: "Este campo tiene que tener un máximo de 500 caracteres"})
    .optional()
    .nullable(),
  usage_policy: z
    .string()
    .max(2000, {message: "Este campo tiene que tener un máximo de 2000 caracteres"})
    .optional()
    .nullable(),
});