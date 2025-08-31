import {z} from 'zod';

export const reservationSchema2 = z.object({
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
    .max(200)
    .refine(
      val => val === "" || /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(val),
      { message: "No has introducido una URL válida" }
    )
});