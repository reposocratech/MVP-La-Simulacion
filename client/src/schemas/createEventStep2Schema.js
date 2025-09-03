import { z } from 'zod';

export const eventStep2Schema = z.object({
  duration: z
    .string({message: "Este campo es obligatorio"})
    .max(50, {message: "Este campo tiene que tener un máximo de 50 caracteres"})
    .optional()
    .nullable(),
  start_date: z
    .string()
    .optional()
    .nullable()
     .refine(val => {
      if (!val || val === "") return true;
      return /^\d{4}-\d{2}-\d{2}$/.test(val);
    }, {
      message: "La fecha de fin debe tener el formato YYYY-MM-DD"
    }),
  end_date: z
    .string()
    .optional()
    .nullable()
     .refine(val => {
      if (!val || val === "") return true;
      return /^\d{4}-\d{2}-\d{2}$/.test(val);
    }, {
      message: "La fecha de fin debe tener el formato YYYY-MM-DD"
    }),
  start_hour: z
    .string()
    .optional()
    .nullable()
     .refine(val => {
      if (!val || val === "") return true;
      return /^([01]\d|2[0-3]):([0-5]\d)$/.test(val);
    }, {
      message: "Hora inválida (HH:mm)"
    }),
  end_hour: z
    .string()
    .optional()
    .nullable()
     .refine(val => {
      if (!val || val === "") return true;
      return /^([01]\d|2[0-3]):([0-5]\d)$/.test(val);
    }, {
      message: "Hora inválida (HH:mm)"
    }),
  number_of_attendees: z
      .string()
      .max(50, {message: "Este campo tiene que tener un máximo de 50 caracteres"})
      .optional()
      .nullable(),
  price: z
    .preprocess((val) => (val === "" ? undefined : Number(val)), z
      .number({message: "Se espera un dato numérico"})
      .nonnegative({message: "El precio no puede ser negativo"})
      .max(9999.99, {message: "El precio no puede superar 9999.99"})
      .optional()
      .nullable()),
  ticket_link: z
    .string()
    .optional()
    .nullable()
    .refine(val => {
      if (!val || val === "") return true;
      return /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()+,;=])?$/.test(val);
    }, {
      message: "No has introducido una URL válida"
    }),
});
