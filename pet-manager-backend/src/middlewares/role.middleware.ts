import { NextFunction, Request, Response } from "express";

export const verificarAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usuario = (req as any).usuario;

  if (!usuario) {
    return res.status(401).json({
      message: "Usuario no autenticado"
    });
  }

  if (usuario.rol !== "ADMIN") {
    return res.status(403).json({
      message: "No tienes permisos para realizar esta acción"
    });
  }

  next();
};