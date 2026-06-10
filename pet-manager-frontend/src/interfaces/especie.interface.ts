export interface Especie {
  id: number;
  nombre: string;
  descripcion?: string | null;
  estado: boolean;
  fechaRegistro: string;
}

export interface CrearEspecieRequest {
  nombre: string;
  descripcion?: string | null;
}

export interface ActualizarEspecieRequest {
  nombre?: string;
  descripcion?: string | null;
  estado?: boolean;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  errors?: string[];
}