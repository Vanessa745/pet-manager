import api from "../api/api";
import type {
  ActualizarMascotaRequest,
  ApiResponse,
  CrearMascotaRequest,
  Mascota
} from "../interfaces/mascota.interface";

export const obtenerMascotas = async (): Promise<Mascota[]> => {
  const response = await api.get<ApiResponse<Mascota[]>>("/mascotas");
  return response.data.data;
};

export const obtenerMascotaPorId = async (id: number): Promise<Mascota> => {
  const response = await api.get<ApiResponse<Mascota>>(`/mascotas/${id}`);
  return response.data.data;
};

export const obtenerMascotasPorDueno = async (
  duenoId: number
): Promise<Mascota[]> => {
  const response = await api.get<ApiResponse<Mascota[]>>(
    `/mascotas/dueno/${duenoId}`
  );

  return response.data.data;
};

export const crearMascota = async (
  data: CrearMascotaRequest
): Promise<Mascota> => {
  const response = await api.post<ApiResponse<Mascota>>("/mascotas", data);
  return response.data.data;
};

export const actualizarMascota = async (
  id: number,
  data: ActualizarMascotaRequest
): Promise<Mascota> => {
  const response = await api.put<ApiResponse<Mascota>>(
    `/mascotas/${id}`,
    data
  );

  return response.data.data;
};

export const eliminarMascota = async (id: number): Promise<Mascota> => {
  const response = await api.delete<ApiResponse<Mascota>>(`/mascotas/${id}`);
  return response.data.data;
};