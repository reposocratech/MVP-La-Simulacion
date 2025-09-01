import {z} from 'zod';

const keyPointSchema = z.object({
  key_point_title: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"})
    .max(150, {message: "Este campo tiene que tener un máximo de 150 caracteres"}),
  key_point_description: z
    .string()
    .max(500, {message: "Este campo tiene que tener un máximo de 500 caracteres"})
    .optional()
    .nullable(),
});

const sectionSchema = z.object({
  section_title: z
    .string({message: "Este campo es obligatorio"})
    .nonempty({message: "Este campo es obligatorio"})
    .max(100, {message: "Este campo tiene que tener un máximo de 100 caracteres"}),
  section_subtitle: z
    .string()
    .max(350, {message: "Este campo tiene que tener un máximo de 350 caracteres"})
    .optional()
    .nullable(),
  section_description: z
    .string()
    .max(600, {message: "Este campo tiene que tener un máximo de 600 caracteres"})
    .optional()
    .nullable(),
  section_duration: z
    .string()
    .max(50, {message: "Este campo tiene que tener un máximo de 50 caracteres"})
    .optional()
    .nullable(),
});

export const createEventSchema = z.object({
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
      .number()
      .nonnegative("El precio no puede ser negativo")
      .max(9999.99, "El precio no puede superar 9999.99")
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
})