import { z } from "zod";

export const crearDuenoSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres"),

  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede superar los 50 caracteres"),

  ci: z
    .string()
    .min(5, "El CI debe tener al menos 5 caracteres")
    .max(20, "El CI no puede superar los 20 caracteres"),

  telefono: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 caracteres")
    .max(20, "El teléfono no puede superar los 20 caracteres"),

  email: z
    .string()
    .email("El email no tiene un formato válido")
    .optional()
    .nullable(),

  direccion: z
    .string()
    .max(150, "La dirección no puede superar los 150 caracteres")
    .optional()
    .nullable()
});

export const actualizarDuenoSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres")
    .optional(),

  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede superar los 50 caracteres")
    .optional(),

  ci: z
    .string()
    .min(5, "El CI debe tener al menos 5 caracteres")
    .max(20, "El CI no puede superar los 20 caracteres")
    .optional(),

  telefono: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 caracteres")
    .max(20, "El teléfono no puede superar los 20 caracteres")
    .optional(),

  email: z
    .string()
    .email("El email no tiene un formato válido")
    .optional()
    .nullable(),

  direccion: z
    .string()
    .max(150, "La dirección no puede superar los 150 caracteres")
    .optional()
    .nullable(),

  estado: z
    .boolean()
    .optional()
});