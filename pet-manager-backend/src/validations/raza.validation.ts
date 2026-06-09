import { z } from "zod";

export const crearRazaSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres"),

  descripcion: z
    .string()
    .max(255, "La descripción no puede superar los 255 caracteres")
    .optional()
    .nullable(),

  especieId: z
    .number({
      message: "El id de la especie es obligatorio"
    })
    .int("El id de la especie debe ser un número entero")
    .positive("El id de la especie debe ser mayor a 0")
});

export const actualizarRazaSchema = z.object({
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

  especieId: z
    .number()
    .int("El id de la especie debe ser un número entero")
    .positive("El id de la especie debe ser mayor a 0")
    .optional(),

  estado: z
    .boolean()
    .optional()
});