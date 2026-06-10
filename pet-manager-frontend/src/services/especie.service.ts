import api from "../api/api";
import type {
  ActualizarEspecieRequest,
  ApiResponse,
  CrearEspecieRequest,
  Especie
} from "../interfaces/especie.interface";

export const obtenerEspecies = async (): Promise<Especie[]> => {
  const response = await api.get<ApiResponse<Especie[]>>("/especies");
  return response.data.data;
};

export const obtenerEspeciePorId = async (id: number): Promise<Especie> => {
  const response = await api.get<ApiResponse<Especie>>(`/especies/${id}`);
  return response.data.data;
};

export const crearEspecie = async (
  data: CrearEspecieRequest
): Promise<Especie> => {
  const response = await api.post<ApiResponse<Especie>>("/especies", data);
  return response.data.data;
};

export const actualizarEspecie = async (
  id: number,
  data: ActualizarEspecieRequest
): Promise<Especie> => {
  const response = await api.put<ApiResponse<Especie>>(
    `/especies/${id}`,
    data
  );

  return response.data.data;
};

export const eliminarEspecie = async (id: number): Promise<Especie> => {
  const response = await api.delete<ApiResponse<Especie>>(`/especies/${id}`);
  return response.data.data;
};