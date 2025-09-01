import {z} from 'zod';

export const reservationSchema3 = z.object({
  ilumination_material: z
    .string()
    .nonempty({message: "Debes marcar si necesitas o no el material de iluminación"})
    .refine(val => val === "0" || val === "1", {
      message: "Debes marcar si necesitas o no el material de iluminación"
    }),
  number_of_attendees: z
    .string({message: "El campo número de asistentes es obligatorio"})
    .nonempty({message: "El campo número de asistentes es obligatorio"})
    .max(100, {message: "El campo número de asistentes no puede tener más de 100 caracteres"}),
  aditional_requirement: z
    .string()
    .max(250, {message: "El campo de requerimientos adicionales no puede tener más de 250 caracteres"})
    .nullable(),
  user_policy_confirmation: z
    .number()
    .refine(val => val === 1, {
      message: "Debes aceptar la política de uso"
    })
});