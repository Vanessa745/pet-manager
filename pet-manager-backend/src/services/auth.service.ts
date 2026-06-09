import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../config/prisma";

interface RegisterData {
  nombre: string;
  email: string;
  password: string;
  rol?: "ADMIN" | "USER";
}

interface LoginData {
  email: string;
  password: string;
}

const generarToken = (usuario: {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET no está definido en el archivo .env");
  }

  return jwt.sign(
    {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    },
    jwtSecret,
    {
      expiresIn: "2h"
    }
  );
};

export const registrarUsuario = async (data: RegisterData) => {
  const usuarioExistente = await prisma.usuario.findUnique({
    where: {
      email: data.email
    }
  });

  if (usuarioExistente) {
    throw new Error("El email ya está registrado");
  }

  const passwordEncriptado = await bcrypt.hash(data.password, 10);

  const usuario = await prisma.usuario.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      password: passwordEncriptado,
      rol: data.rol || "USER",
      estado: true
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
      estado: true,
      fechaRegistro: true
    }
  });

  const token = generarToken(usuario);

  return {
    usuario,
    token
  };
};

export const iniciarSesion = async (data: LoginData) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: data.email
    }
  });

  if (!usuario) {
    throw new Error("Credenciales incorrectas");
  }

  if (!usuario.estado) {
    throw new Error("El usuario se encuentra inactivo");
  }

  const passwordValido = await bcrypt.compare(data.password, usuario.password);

  if (!passwordValido) {
    throw new Error("Credenciales incorrectas");
  }

  const usuarioSinPassword = {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    estado: usuario.estado,
    fechaRegistro: usuario.fechaRegistro
  };

  const token = generarToken(usuarioSinPassword);

  return {
    usuario: usuarioSinPassword,
    token
  };
};