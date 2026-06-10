import api from "../api/api";
import type {
  ActualizarDuenoRequest,
  ApiResponse,
  CrearDuenoRequest,
  Dueno
} from "../interfaces/dueno.interface";

export const obtenerDuenos = async (): Promise<Dueno[]> => {
  const response = await api.get<ApiResponse<Dueno[]>>("/duenos");
  return response.data.data;
};

export const obtenerDuenoPorId = async (id: number): Promise<Dueno> => {
  const response = await api.get<ApiResponse<Dueno>>(`/duenos/${id}`);
  return response.data.data;
};

export const crearDueno = async (
  data: CrearDuenoRequest
): Promise<Dueno> => {
  const response = await api.post<ApiResponse<Dueno>>("/duenos", data);
  return response.data.data;
};

export const actualizarDueno = async (
  id: number,
  data: ActualizarDuenoRequest
): Promise<Dueno> => {
  const response = await api.put<ApiResponse<Dueno>>(`/duenos/${id}`, data);
  return response.data.data;
};

export const eliminarDueno = async (id: number): Promise<Dueno> => {
  const response = await api.delete<ApiResponse<Dueno>>(`/duenos/${id}`);
  return response.data.data;
};