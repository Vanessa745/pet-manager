import { Request, Response } from "express";

import {
  actualizarMascota,
  crearMascota,
  eliminarMascota,
  obtenerMascotaPorId,
  obtenerMascotas,
  obtenerMascotasPorDueno
} from "../services/mascota.service";

import {
  actualizarMascotaSchema,
  crearMascotaSchema
} from "../validations/mascota.validation";

type IdParams = {
  id: string;
};

type DuenoIdParams = {
  duenoId: string;
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

export const listarMascotas = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const mascotas = await obtenerMascotas();

    res.status(200).json({
      message: "Mascotas obtenidas correctamente",
      data: mascotas
    });

    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener las mascotas"
    });

    return;
  }
};

export const obtenerMascota = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const mascota = await obtenerMascotaPorId(id);

    res.status(200).json({
      message: "Mascota obtenida correctamente",
      data: mascota
    });

    return;
  } catch (error) {
    res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener la mascota"
    });

    return;
  }
};

export const listarMascotasPorDueno = async (
  req: Request<DuenoIdParams>,
  res: Response
): Promise<void> => {
  try {
    const duenoId = obtenerId(req.params.duenoId);

    const mascotas = await obtenerMascotasPorDueno(duenoId);

    res.status(200).json({
      message: "Mascotas del dueño obtenidas correctamente",
      data: mascotas
    });

    return;
  } catch (error) {
    res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener las mascotas del dueño"
    });

    return;
  }
};

export const registrarMascota = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validacion = crearMascotaSchema.safeParse(req.body);

    if (!validacion.success) {
      res.status(400).json({
        message: "Error de validación",
        errors: validacion.error.issues.map((issue) => issue.message)
      });

      return;
    }

    const mascota = await crearMascota(validacion.data);

    res.status(201).json({
      message: "Mascota registrada correctamente",
      data: mascota
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al registrar la mascota"
    });

    return;
  }
};

export const editarMascota = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const validacion = actualizarMascotaSchema.safeParse(req.body);

    if (!validacion.success) {
      res.status(400).json({
        message: "Error de validación",
        errors: validacion.error.issues.map((issue) => issue.message)
      });

      return;
    }

    const mascota = await actualizarMascota(id, validacion.data);

    res.status(200).json({
      message: "Mascota actualizada correctamente",
      data: mascota
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al actualizar la mascota"
    });

    return;
  }
};

export const borrarMascota = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const mascota = await eliminarMascota(id);

    res.status(200).json({
      message: "Mascota eliminada correctamente",
      data: mascota
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al eliminar la mascota"
    });

    return;
  }
};