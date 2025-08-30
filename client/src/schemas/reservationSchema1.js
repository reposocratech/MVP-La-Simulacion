import {z} from 'zod';

export const reservationSchema1 = z.object({
  phone_number: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"})
    .max(30, {message: "Has sobrepasado el máximo de caracteres"})
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  date: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"}),
  start_hour: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"}),
  end_hour: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"}),

});