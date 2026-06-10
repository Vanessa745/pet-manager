import api from "../api/api";
import type {
  ActualizarRazaRequest,
  ApiResponse,
  CrearRazaRequest,
  Raza
} from "../interfaces/raza.interface";

export const obtenerRazas = async (): Promise<Raza[]> => {
  const response = await api.get<ApiResponse<Raza[]>>("/razas");
  return response.data.data;
};

export const obtenerRazaPorId = async (id: number): Promise<Raza> => {
  const response = await api.get<ApiResponse<Raza>>(`/razas/${id}`);
  return response.data.data;
};

export const obtenerRazasPorEspecie = async (
  especieId: number
): Promise<Raza[]> => {
  const response = await api.get<ApiResponse<Raza[]>>(
    `/razas/especie/${especieId}`
  );

  return response.data.data;
};

export const crearRaza = async (data: CrearRazaRequest): Promise<Raza> => {
  const response = await api.post<ApiResponse<Raza>>("/razas", data);
  return response.data.data;
};

export const actualizarRaza = async (
  id: number,
  data: ActualizarRazaRequest
): Promise<Raza> => {
  const response = await api.put<ApiResponse<Raza>>(`/razas/${id}`, data);
  return response.data.data;
};

export const eliminarRaza = async (id: number): Promise<Raza> => {
  const response = await api.delete<ApiResponse<Raza>>(`/razas/${id}`);
  return response.data.data;
};