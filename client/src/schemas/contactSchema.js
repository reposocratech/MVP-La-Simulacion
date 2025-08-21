import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({ message: "El nombre es obligatorio" })
    .nonempty({ message: "El nombre es obligatorio" }),

  lastname: z
    .string({ message: "El apellido es obligatorio" })
    .nonempty({ message: "El apellido es obligatorio" }),

  email: z
    .string({ message: "El email es obligatorio" })
    .nonempty({ message: "El email es obligatorio" })
    .email({ message: "Formato de email no válido" }),

  phone_number: z
    .string({ message: "El teléfono es obligatorio" })
    .nonempty({ message: "El teléfono es obligatorio" })
    .regex(/^\d+$/, { message: "El teléfono solo debe contener números" }),

  consult: z
    .string({ message: "La consulta es obligatoria" })
    .nonempty({ message: "La consulta es obligatoria" }),
});
