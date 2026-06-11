import type { Dueno } from "./dueno.interface";
import type { Especie } from "./especie.interface";
import type { Raza } from "./raza.interface";

export type SexoMascota = "MACHO" | "HEMBRA" | "DESCONOCIDO";

export interface Mascota {
  id: number;
  nombre: string;
  edad?: number | null;
  sexo: SexoMascota;
  color?: string | null;
  peso?: number | null;
  imagen?: string | null;
  observaciones?: string | null;
  estado: boolean;
  fechaRegistro: string;

  duenoId: number;
  especieId: number;
  razaId?: number | null;

  dueno?: Dueno;
  especie?: Especie;
  raza?: Raza | null;
}

export interface CrearMascotaRequest {
  nombre: string;
  edad?: number | null;
  sexo?: SexoMascota;
  color?: string | null;
  peso?: number | null;
  imagen?: string | null;
  observaciones?: string | null;
  duenoId: number;
  especieId: number;
  razaId?: number | null;
}

export interface ActualizarMascotaRequest {
  nombre?: string;
  edad?: number | null;
  sexo?: SexoMascota;
  color?: string | null;
  peso?: number | null;
  imagen?: string | null;
  observaciones?: string | null;
  duenoId?: number;
  especieId?: number;
  razaId?: number | null;
  estado?: boolean;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  errors?: string[];
}