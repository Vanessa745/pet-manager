export interface Dueno {
  id: number;
  nombre: string;
  apellido: string;
  ci: string;
  telefono?: string | null;
  email?: string | null;
  direccion?: string | null;
  estado: boolean;
  fechaRegistro: string;
}

export interface CrearDuenoRequest {
  nombre: string;
  apellido: string;
  ci: string;
  telefono?: string | null;
  email?: string | null;
  direccion?: string | null;
}

export interface ActualizarDuenoRequest {
  nombre?: string;
  apellido?: string;
  ci?: string;
  telefono?: string | null;
  email?: string | null;
  direccion?: string | null;
  estado?: boolean;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  errors?: string[];
}