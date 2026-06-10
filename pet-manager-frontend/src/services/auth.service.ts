import api from "../api/api";
import type {
    ApiAuthResponse,
    LoginRequest,
    LoginResponse,
    Usuario
} from "../interfaces/auth.interface";

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<ApiAuthResponse>(
    "/auth/login",
    credentials
  );

  const { usuario, token } = response.data.data;

  localStorage.setItem("token", token);
  localStorage.setItem("usuario", JSON.stringify(usuario));

  return {
    usuario,
    token
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
};

export const obtenerToken = () => {
  return localStorage.getItem("token");
};

export const obtenerUsuario = (): Usuario | null => {
  const usuarioGuardado = localStorage.getItem("usuario");

  if (!usuarioGuardado) {
    return null;
  }

  return JSON.parse(usuarioGuardado) as Usuario;
};

export const estaAutenticado = () => {
  return Boolean(localStorage.getItem("token"));
};

export const esAdmin = () => {
  const usuario = obtenerUsuario();

  return usuario?.rol === "ADMIN";
};