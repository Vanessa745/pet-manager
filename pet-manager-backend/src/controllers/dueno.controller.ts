import { Request, Response } from "express";

import {
  actualizarDueno,
  crearDueno,
  eliminarDueno,
  obtenerDuenoPorId,
  obtenerDuenos
} from "../services/dueno.service";

import {
  actualizarDuenoSchema,
  crearDuenoSchema
} from "../validations/dueno.validation";

type IdParams = {
  id: string;
};

const obtenerId = (id: string | undefined) => {
  if (!id) {
    throw new Error("El id es obligatorio");
  }

  const idNumerico = Number(id);

  if (Number.isNaN(idNumerico)) {
    throw new Error("El id no es válido");
  }

  return idNumerico;
};

export const listarDuenos = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const duenos = await obtenerDuenos();

    res.status(200).json({
      message: "Dueños obtenidos correctamente",
      data: duenos
    });

    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error al obtener los dueños"
    });

    return;
  }
};

export const obtenerDueno = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const dueno = await obtenerDuenoPorId(id);

    res.status(200).json({
      message: "Dueño obtenido correctamente",
      data: dueno
    });

    return;
  } catch (error) {
    res.status(404).json({
      message:
        error instanceof Error ? error.message : "Error al obtener el dueño"
    });

    return;
  }
};

export const registrarDueno = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validacion = crearDuenoSchema.safeParse(req.body);

    if (!validacion.success) {
      res.status(400).json({
        message: "Error de validación",
        errors: validacion.error.issues.map((issue) => issue.message)
      });

      return;
    }

    const dueno = await crearDueno(validacion.data);

    res.status(201).json({
      message: "Dueño registrado correctamente",
      data: dueno
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Error al registrar el dueño"
    });

    return;
  }
};

export const editarDueno = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const validacion = actualizarDuenoSchema.safeParse(req.body);

    if (!validacion.success) {
      res.status(400).json({
        message: "Error de validación",
        errors: validacion.error.issues.map((issue) => issue.message)
      });

      return;
    }

    const dueno = await actualizarDueno(id, validacion.data);

    res.status(200).json({
      message: "Dueño actualizado correctamente",
      data: dueno
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Error al actualizar el dueño"
    });

    return;
  }
};

export const borrarDueno = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const dueno = await eliminarDueno(id);

    res.status(200).json({
      message: "Dueño eliminado correctamente",
      data: dueno
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Error al eliminar el dueño"
    });

    return;
  }
};