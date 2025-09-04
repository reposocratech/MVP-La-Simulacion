import {z} from 'zod';

export const editEventKeyPointSchema = z.object({
  keyPoint: z.object({
    key_point_title: z
      .string({ message: "Este campo es obligatorio" })
      .nonempty({ message: "Este campo es obligatorio" })
      .max(150, { message: "Este campo tiene que tener un máximo de 150 caracteres" }),
    key_point_description: z
      .string()
      .max(500, { message: "Este campo tiene que tener un máximo de 500 caracteres" })
      .optional()
      .nullable(),
  }),
  section_id: z.number({ message: "section_id es obligatorio" }),
  event_id: z.string().optional(), // opcional si lo obtienes de otra fuente (req.params)
});