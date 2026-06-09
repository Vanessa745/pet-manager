import { Request, Response } from "express";

import {
  actualizarEspecie,
  crearEspecie,
  eliminarEspecie,
  obtenerEspeciePorId,
  obtenerEspecies
} from "../services/especie.service";

import {
  actualizarEspecieSchema,
  crearEspecieSchema
} from "../validations/especie.validation";

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

export const listarEspecies = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const especies = await obtenerEspecies();

    res.status(200).json({
      message: "Especies obtenidas correctamente",
      data: especies
    });

    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener las especies"
    });

    return;
  }
};

export const obtenerEspecie = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const especie = await obtenerEspeciePorId(id);

    res.status(200).json({
      message: "Especie obtenida correctamente",
      data: especie
    });

    return;
  } catch (error) {
    res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener la especie"
    });

    return;
  }
};

export const registrarEspecie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validacion = crearEspecieSchema.safeParse(req.body);

    if (!validacion.success) {
      res.status(400).json({
        message: "Error de validación",
        errors: validacion.error.issues.map((issue) => issue.message)
      });

      return;
    }

    const especie = await crearEspecie(validacion.data);

    res.status(201).json({
      message: "Especie registrada correctamente",
      data: especie
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al registrar la especie"
    });

    return;
  }
};

export const editarEspecie = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const validacion = actualizarEspecieSchema.safeParse(req.body);

    if (!validacion.success) {
      res.status(400).json({
        message: "Error de validación",
        errors: validacion.error.issues.map((issue) => issue.message)
      });

      return;
    }

    const especie = await actualizarEspecie(id, validacion.data);

    res.status(200).json({
      message: "Especie actualizada correctamente",
      data: especie
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al actualizar la especie"
    });

    return;
  }
};

export const borrarEspecie = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const especie = await eliminarEspecie(id);

    res.status(200).json({
      message: "Especie eliminada correctamente",
      data: especie
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al eliminar la especie"
    });

    return;
  }
};