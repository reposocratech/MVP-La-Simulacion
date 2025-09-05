import {z} from 'zod';

export const formCoopSchema = z.object({
    user_name: z
        .string({message:"El nombre es necesario"})
        .nonempty({message: "El nombre es necesario"})
        .min(3,{message:"El nombre debe ser mayor de 3 caracteres"})
        .max(30,{message:"El nombre debe ser menor de 30 caracteres"}),

    lastName: z
        .string({message:"El apellido es necesario"})
        .nonempty({message: "El apellido es necesario"})
        .min(2,{message:"El apellido debe ser mayor de 2 caracteres"})
        .max(30,{message:"El apellido debe ser menor de 30 caracteres"}),

    email: z
        .email({message:"Email no válido"}),

    phone: z
        .string({message:"El teléfono es necesario"})
        .nonempty({message: "El teléfono es necesario"})
        .min(7, "El número es demasiado corto")
        .max(30, "El número es demasiado largo")
        .regex(
            /^\+?\d*$/,
            "El teléfono solo puede contener números y, opcionalmente, un signo '+' al principio."
        ),

    type: z
        .string()
        .min(2, { message: "Debes marcar alguna de las opciones" }),

    description: z
        .string({message:"El descripción es necesaria"})
        .nonempty({message: "El descripción es necesaria"})
        .min(10,{message:"La descripción tiene que ser mas larga"})
        .max(500,{message:"El descripción debe ser menor de 500 caracteres"}),
   
    })