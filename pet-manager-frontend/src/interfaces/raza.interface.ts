import type { Especie } from "./especie.interface";

export interface Raza {
  id: number;
  nombre: string;
  descripcion?: string | null;
  estado: boolean;
  fechaRegistro: string;
  especieId: number;
  especie?: Especie;
}

export interface CrearRazaRequest {
  nombre: string;
  descripcion?: string | null;
  especieId: number;
}

export interface ActualizarRazaRequest {
  nombre?: string;
  descripcion?: string | null;
  especieId?: number;
  estado?: boolean;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  errors?: string[];
}