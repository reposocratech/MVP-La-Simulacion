import {z} from 'zod';

export const createEventSectionSchema = z.object({
    section_title: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"})
    .max(100, {message: "Este campo tiene que tener un máximo de 100 caracteres"}),
  section_subtitle: z
    .string()
    .max(350, {message: "Este campo tiene que tener un máximo de 350 caracteres"})
    .optional()
    .nullable(),
  section_description: z
    .string()
    .max(600, {message: "Este campo tiene que tener un máximo de 600 caracteres"})
    .optional()
    .nullable(),
  section_duration: z
    .string()
    .max(50, {message: "Este campo tiene que tener un máximo de 50 caracteres"})
    .optional()
    .nullable(),
})