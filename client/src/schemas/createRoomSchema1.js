import {z} from 'zod';

export const createRoomSchema1 = z.object({
  room_name: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"})
    .max(150, {message: "Esta campo tiene que tener un máximo de 150 caracteres"}),
  room_description: z
    .string()
    .max(2000, {message: "Esta campo tiene que tener un máximo de 2000 caracteres"})
    .optional()
    .nullable(),
  who_can_use_it: z
    .string()
    .max(2000, {message: "Esta campo tiene que tener un máximo de 2000 caracteres"})
    .optional()
    .nullable()
});