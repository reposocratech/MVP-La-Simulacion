import z from "zod";


export const createCoopSchema = z.object({
  service_name: z
    .string({message:"El titulo es necesario"})
    .nonempty({message: "El titulo es necesario"})
    .min(3,{message:"El titulo debe ser mayor de 3 caracteres"})
    .max(100,{message:"El titulo debe ser menor de 100 caracteres"}),
  service_description: z
    .string({message:"La descripción es necesaria"})
    .nonempty({message: "La descripción es necesaria"})
    .min(10,{message:"La descripción debe ser mayor a 10 caracteres"})
    .max(1500,{message:"La descripción debe ser menor de 1500 caracteres"}),  
})
