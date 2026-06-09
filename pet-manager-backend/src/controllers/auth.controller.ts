import { Request, Response } from "express";

import { iniciarSesion, registrarUsuario } from "../services/auth.service";
import { loginSchema, registerSchema } from "../validations/auth.validation";

export const register = async (req: Request, res: Response) => {
  try {
    const validacion = registerSchema.safeParse(req.body);

    if (!validacion.success) {
      return res.status(400).json({
        message: "Error de validación",
        errors: validacion.error.issues.map((issue) => issue.message)
      });
    }

    const resultado = await registrarUsuario(validacion.data);

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      data: resultado
    });
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Error al registrar usuario"
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validacion = loginSchema.safeParse(req.body);

    if (!validacion.success) {
      return res.status(400).json({
        message: "Error de validación",
        errors: validacion.error.issues.map((issue) => issue.message)
      });
    }

    const resultado = await iniciarSesion(validacion.data);

    return res.status(200).json({
      message: "Inicio de sesión correcto",
      data: resultado
    });
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Error al iniciar sesión"
    });
  }
};

export const profile = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Perfil obtenido correctamente",
    data: (req as any).usuario
  });
};