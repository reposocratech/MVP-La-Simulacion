import {z} from 'zod';

export const reservationSchema2 = z.object({
  proyect_description: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"})
    .max(350, {message: "La descripción de tu proyecto y trayectoria no puede tener más de 350 caracteres"}),
  proyect_type: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"})
    .max(150, {message: "El tipo de proyecto no puede tener más de 150 caracteres"}),
  socialmedia_link: z
    .string()
    .max(200, {message: "El enlace no puede tener más de 200 caracteres"}),
});