export type RolUsuario = "ADMIN" | "USER";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: RolUsuario;
  estado: boolean;
  fechaRegistro?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  usuario: Usuario;
  token: string;
}

export interface ApiAuthResponse {
  message: string;
  data: LoginResponse;
}