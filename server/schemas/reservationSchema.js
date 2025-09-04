import {z} from 'zod';

export const reservationSchema = z.object({
  phone_number: z
    .string({message: "El número de teléfono es obligatorio"})
    .nonempty({message: "El número de teléfono es obligatorio"})
    .max(30, {message: "Has sobrepasado el máximo de caracteres del número de teléfono"})
    .regex(
    /^\+?\d*$/,
    "El teléfono solo puede contener números y, opcionalmente, un signo '+' al principio."
    ),
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
  proyect_description: z
    .string({message: "La descripción de tu proyecto y trayectoria es obligatoria"})
    .nonempty({message: "La descripción de tu proyecto y trayectoria es obligatoria"})
    .max(350, {message: "La descripción de tu proyecto y trayectoria no puede tener más de 350 caracteres"}),
  proyect_type: z
    .string({message: "El tipo de proyecto es obligatorio"})
    .nonempty({message: "El tipo de proyecto es obligatorio"})
    .max(150, {message: "El tipo de proyecto no puede tener más de 150 caracteres"}),
  socialmedia_link: z
    .string()
    .optional()
    .nullable()
    .refine(val => {
      if (!val || val === "") return true;
      return /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(val);
    }, {
      message: "No has introducido una URL válida"
    }),
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