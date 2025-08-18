import {z, ZodError} from 'zod';

export const registerSchema = z.object({
    user_name: z
        .string({message:"El nombre es necesario"})
        .min(3,{message:"El nombre debe ser mayor de 3 caracteres"})
        .max(30,{message:"El nombre debe ser menor de 30 caracteres"}),
    email: z
        .email({message:"Email no válido"}),
    password: z
        .string({message:"Password Obligatorio"})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,20}$/, {message:"Password no válido"}),
    repPassword: z
    .string({message:"Debes repetir la contraseña"})
}).refine((data)=> data.password === data.repPassword,{
    message:"Las contraseñas deben coincidir",
    path:["repPassword"]
})
