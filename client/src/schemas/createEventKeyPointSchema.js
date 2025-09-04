import {z} from 'zod';

export const createEventKeyPointSchema = z.object({
  key_point_title: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"})
    .max(100, {message: "Este campo tiene que tener un máximo de 150 caracteres"}),
  key_point_description: z
    .string()
    .max(500, {message: "Este campo tiene que tener un máximo de 500 caracteres"})
    .optional()
    .nullable(),
});