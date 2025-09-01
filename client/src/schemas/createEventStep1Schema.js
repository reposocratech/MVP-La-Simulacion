import {z} from 'zod';

export const createEventStep1Schema = z.object({
  type_event: z
    .string()
    .nonempty({message: "Debes marcar si es Evento o Taller"})
    .refine(val => val === "1" || val === "2", {
      message: "Debes marcar si es Evento o Taller" }),
  event_title: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"})
    .max(100, {message: "Este campo tiene que tener un máximo de 100 caracteres"}),
  event_description: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"})
    .max(350, {message: "Este campo tiene que tener un máximo de 350 caracteres"}),
  location: z
    .string()
    .max(150, {message: "Este campo tiene que tener un máximo de 150 caracteres"})
    .optional()
    .nullable(),
})