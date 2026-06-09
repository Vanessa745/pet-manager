import { z } from "zod";

export const crearMascotaSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres"),

  edad: z
    .coerce
    .number()
    .int("La edad debe ser un número entero")
    .min(0, "La edad no puede ser negativa")
    .optional()
    .nullable(),

  sexo: z
    .enum(["MACHO", "HEMBRA", "DESCONOCIDO"])
    .optional(),

  color: z
    .string()
    .max(50, "El color no puede superar los 50 caracteres")
    .optional()
    .nullable(),

  peso: z
    .coerce
    .number()
    .positive("El peso debe ser mayor a 0")
    .optional()
    .nullable(),

  imagen: z
    .string()
    .url("La imagen debe ser una URL válida")
    .optional()
    .nullable(),

  observaciones: z
    .string()
    .max(255, "Las observaciones no pueden superar los 255 caracteres")
    .optional()
    .nullable(),

  duenoId: z
    .coerce
    .number()
    .int("El id del dueño debe ser un número entero")
    .positive("El id del dueño debe ser mayor a 0"),

  especieId: z
    .coerce
    .number()
    .int("El id de la especie debe ser un número entero")
    .positive("El id de la especie debe ser mayor a 0"),

  razaId: z
    .coerce
    .number()
    .int("El id de la raza debe ser un número entero")
    .positive("El id de la raza debe ser mayor a 0")
    .optional()
    .nullable()
});

export const actualizarMascotaSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres")
    .optional(),

  edad: z
    .coerce
    .number()
    .int("La edad debe ser un número entero")
    .min(0, "La edad no puede ser negativa")
    .optional()
    .nullable(),

  sexo: z
    .enum(["MACHO", "HEMBRA", "DESCONOCIDO"])
    .optional(),

  color: z
    .string()
    .max(50, "El color no puede superar los 50 caracteres")
    .optional()
    .nullable(),

  peso: z
    .coerce
    .number()
    .positive("El peso debe ser mayor a 0")
    .optional()
    .nullable(),

  imagen: z
    .string()
    .url("La imagen debe ser una URL válida")
    .optional()
    .nullable(),

  observaciones: z
    .string()
    .max(255, "Las observaciones no pueden superar los 255 caracteres")
    .optional()
    .nullable(),

  duenoId: z
    .coerce
    .number()
    .int("El id del dueño debe ser un número entero")
    .positive("El id del dueño debe ser mayor a 0")
    .optional(),

  especieId: z
    .coerce
    .number()
    .int("El id de la especie debe ser un número entero")
    .positive("El id de la especie debe ser mayor a 0")
    .optional(),

  razaId: z
    .coerce
    .number()
    .int("El id de la raza debe ser un número entero")
    .positive("El id de la raza debe ser mayor a 0")
    .optional()
    .nullable(),

  estado: z
    .boolean()
    .optional()
});