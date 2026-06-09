import { Request, Response } from "express";

import {
  actualizarRaza,
  crearRaza,
  eliminarRaza,
  obtenerRazaPorId,
  obtenerRazas,
  obtenerRazasPorEspecie
} from "../services/raza.service";

import {
  actualizarRazaSchema,
  crearRazaSchema
} from "../validations/raza.validation";

type IdParams = {
  id: string;
};

type EspecieIdParams = {
  especieId: string;
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

export const listarRazas = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const razas = await obtenerRazas();

    res.status(200).json({
      message: "Razas obtenidas correctamente",
      data: razas
    });

    return;
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error al obtener las razas"
    });

    return;
  }
};

export const obtenerRaza = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const raza = await obtenerRazaPorId(id);

    res.status(200).json({
      message: "Raza obtenida correctamente",
      data: raza
    });

    return;
  } catch (error) {
    res.status(404).json({
      message:
        error instanceof Error ? error.message : "Error al obtener la raza"
    });

    return;
  }
};

export const listarRazasPorEspecie = async (
  req: Request<EspecieIdParams>,
  res: Response
): Promise<void> => {
  try {
    const especieId = obtenerId(req.params.especieId);

    const razas = await obtenerRazasPorEspecie(especieId);

    res.status(200).json({
      message: "Razas de la especie obtenidas correctamente",
      data: razas
    });

    return;
  } catch (error) {
    res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Error al obtener las razas de la especie"
    });

    return;
  }
};

export const registrarRaza = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validacion = crearRazaSchema.safeParse(req.body);

    if (!validacion.success) {
      res.status(400).json({
        message: "Error de validación",
        errors: validacion.error.issues.map((issue) => issue.message)
      });

      return;
    }

    const raza = await crearRaza(validacion.data);

    res.status(201).json({
      message: "Raza registrada correctamente",
      data: raza
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Error al registrar la raza"
    });

    return;
  }
};

export const editarRaza = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const validacion = actualizarRazaSchema.safeParse(req.body);

    if (!validacion.success) {
      res.status(400).json({
        message: "Error de validación",
        errors: validacion.error.issues.map((issue) => issue.message)
      });

      return;
    }

    const raza = await actualizarRaza(id, validacion.data);

    res.status(200).json({
      message: "Raza actualizada correctamente",
      data: raza
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Error al actualizar la raza"
    });

    return;
  }
};

export const borrarRaza = async (
  req: Request<IdParams>,
  res: Response
): Promise<void> => {
  try {
    const id = obtenerId(req.params.id);

    const raza = await eliminarRaza(id);

    res.status(200).json({
      message: "Raza eliminada correctamente",
      data: raza
    });

    return;
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Error al eliminar la raza"
    });

    return;
  }
};