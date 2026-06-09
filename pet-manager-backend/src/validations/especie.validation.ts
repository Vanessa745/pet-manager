import { z } from "zod";

export const crearEspecieSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres"),

  descripcion: z
    .string()
    .max(255, "La descripción no puede superar los 255 caracteres")
    .optional()
    .nullable()
});

export const actualizarEspecieSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres")
    .optional(),

  descripcion: z
    .string()
    .max(255, "La descripción no puede superar los 255 caracteres")
    .optional()
    .nullable(),

  estado: z
    .boolean()
    .optional()
});