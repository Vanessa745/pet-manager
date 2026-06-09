import { z } from "zod";

export const registerSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  email: z
    .string()
    .email("El email no tiene un formato válido"),

  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),

  rol: z
    .enum(["ADMIN", "USER"])
    .optional()
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("El email no tiene un formato válido"),

  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
});