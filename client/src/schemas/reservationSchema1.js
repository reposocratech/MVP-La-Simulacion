import {z} from 'zod';

export const reservationSchema1 = z.object({
  phone_number: z
    .string({message: "El número de teléfono es obligatorio"})
    .nonempty({message: "El número de teléfono es obligatorio"})
    .max(30, {message: "Has sobrepasado el máximo de caracteres del número de teléfono"})
    .regex(/^\d+$/, "El teléfono solo debe contener números"),
  date: z
    .string({message: "La fecha es obligatoria"})
    .nonempty({message: "La fecha es obligatoria"})
    .refine(val => {

      const inputDate = new Date(val);
      const today = new Date();
      
      return inputDate > today;

    }, {
      message: "La fecha debe ser futura",
    }),
  start_hour: z
    .string({message: "La hora de inicio es obligatoria"})
    .nonempty({message: "La hora de inicio es obligatoria"}),
  end_hour: z
    .string({message: "La hora de fin es obligatoria"})
    .nonempty({message: "La hora de fin es obligatoria"}),

});