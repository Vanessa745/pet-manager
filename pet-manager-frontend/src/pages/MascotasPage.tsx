import { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PetsIcon from "@mui/icons-material/Pets";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../components/Header";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import MascotaForm from "../components/MascotaForm";

import type { Dueno } from "../interfaces/dueno.interface";
import type { Especie } from "../interfaces/especie.interface";
import type { Raza } from "../interfaces/raza.interface";
import type {
  CrearMascotaRequest,
  Mascota
} from "../interfaces/mascota.interface";

import { obtenerDuenos } from "../services/dueno.service";
import { obtenerEspecies } from "../services/especie.service";
import { obtenerRazas } from "../services/raza.service";
import {
  actualizarMascota,
  crearMascota,
  eliminarMascota,
  obtenerMascotas
} from "../services/mascota.service";
import { esAdmin } from "../services/auth.service";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";

const obtenerMensajeError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; errors?: string[] }
      | undefined;

    if (data?.errors && data.errors.length > 0) {
      return data.errors.join(", ");
    }

    return data?.message || "Ocurrió un error al procesar la solicitud";
  }

  return "Ocurrió un error inesperado";
};

const obtenerEtiquetaSexo = (sexo: string) => {
  if (sexo === "MACHO") {
    return "Macho";
  }

  if (sexo === "HEMBRA") {
    return "Hembra";
  }

  return "Desconocido";
};

const MascotasPage = () => {
  const usuarioAdmin = esAdmin();

  const location = useLocation();
  const navigate = useNavigate();

  const estadoRuta = location.state as { abrirCrear?: boolean } | null;

  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [duenos, setDuenos] = useState<Dueno[]>([]);
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [razas, setRazas] = useState<Raza[]>([]);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const [formAbierto, setFormAbierto] = useState(false);
  const [mascotaEditar, setMascotaEditar] = useState<Mascota | null>(null);

  const [confirmAbierto, setConfirmAbierto] = useState(false);
  const [mascotaEliminar, setMascotaEliminar] = useState<Mascota | null>(null);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError("");

      const [mascotasData, duenosData, especiesData, razasData] =
        await Promise.all([
          obtenerMascotas(),
          obtenerDuenos(),
          obtenerEspecies(),
          obtenerRazas()
        ]);

      setMascotas(mascotasData);
      setDuenos(duenosData);
      setEspecies(especiesData);
      setRazas(razasData);
    } catch (error) {
      setError(obtenerMensajeError(error));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const abrirCrear = () => {
    setMascotaEditar(null);
    setFormAbierto(true);
    setError("");
    setMensajeExito("");
  };

  useEffect(() => {
    if (
      estadoRuta?.abrirCrear &&
      usuarioAdmin &&
      !cargando &&
      duenos.length > 0 &&
      especies.length > 0
    ) {
      abrirCrear();

      navigate(location.pathname, {
        replace: true,
        state: {}
      });
    }
  }, [
    estadoRuta?.abrirCrear,
    usuarioAdmin,
    cargando,
    duenos.length,
    especies.length,
    navigate,
    location.pathname
  ]);

  const abrirEditar = (mascota: Mascota) => {
    setMascotaEditar(mascota);
    setFormAbierto(true);
    setError("");
    setMensajeExito("");
  };

  const cerrarFormulario = () => {
    if (guardando) {
      return;
    }

    setFormAbierto(false);
    setMascotaEditar(null);
  };

  const guardarMascota = async (data: CrearMascotaRequest) => {
    try {
      setGuardando(true);
      setError("");
      setMensajeExito("");

      if (mascotaEditar) {
        await actualizarMascota(mascotaEditar.id, data);
        setMensajeExito("Mascota actualizada correctamente");
      } else {
        await crearMascota(data);
        setMensajeExito("Mascota creada correctamente");
      }

      setFormAbierto(false);
      setMascotaEditar(null);

      await cargarDatos();
    } catch (error) {
      setError(obtenerMensajeError(error));
    } finally {
      setGuardando(false);
    }
  };

  const abrirConfirmacionEliminar = (mascota: Mascota) => {
    setMascotaEliminar(mascota);
    setConfirmAbierto(true);
    setError("");
    setMensajeExito("");
  };

  const cerrarConfirmacionEliminar = () => {
    if (eliminando) {
      return;
    }

    setConfirmAbierto(false);
    setMascotaEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!mascotaEliminar) {
      return;
    }

    try {
      setEliminando(true);
      setError("");
      setMensajeExito("");

      await eliminarMascota(mascotaEliminar.id);

      setMensajeExito("Mascota eliminada correctamente");
      setConfirmAbierto(false);
      setMascotaEliminar(null);

      await cargarDatos();
    } catch (error) {
      setError(obtenerMensajeError(error));
    } finally {
      setEliminando(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Pet Manager | Mascotas</title>

        <meta
          name="description"
          content="Administra el registro principal de mascotas en Pet Manager, relacionando cada mascota con su dueño, especie y raza correspondiente."
        />

        <meta
          name="keywords"
          content="Pet Manager, mascotas, gestión de mascotas, dueños, especies, razas, catálogo de mascotas, CRUD mascotas"
        />

        <meta
          name="author"
          content="Pet Manager"
        />

        <meta
          property="og:title"
          content="Pet Manager | Gestión de mascotas"
        />

        <meta
          property="og:description"
          content="Gestiona mascotas registradas con información de dueño, especie, raza, edad, sexo, peso e imagen dentro del sistema Pet Manager."
        />

        <meta
          property="og:type"
          content="website"
        />
      </Helmet>
      
      <Box>
        <Header
          title="Mascotas"
          subtitle="Administra el registro principal de mascotas del sistema."
          action={
            usuarioAdmin ? (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={abrirCrear}
                disabled={duenos.length === 0 || especies.length === 0}
                sx={{
                  bgcolor: "#0f766e",
                  "&:hover": {
                    bgcolor: "#115e59"
                  }
                }}
              >
                Nueva mascota
              </Button>
            ) : (
              <Chip label="Solo visualización" color="info" variant="outlined" />
            )
          }
        />

        <Stack spacing={2} sx={{ mb: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}
          {mensajeExito && <Alert severity="success">{mensajeExito}</Alert>}

          {!usuarioAdmin && (
            <Alert severity="info">
              Tu rol actual permite visualizar registros, pero no crear, editar ni
              eliminar mascotas.
            </Alert>
          )}

          {usuarioAdmin && duenos.length === 0 && !cargando && (
            <Alert severity="warning">
              Primero debes registrar al menos un dueño antes de crear mascotas.
            </Alert>
          )}

          {usuarioAdmin && especies.length === 0 && !cargando && (
            <Alert severity="warning">
              Primero debes registrar al menos una especie antes de crear mascotas.
            </Alert>
          )}
        </Stack>

        <Card
          sx={{
            borderRadius: 4,
            border: "1px solid #e5e7eb",
            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)"
          }}
        >
          <CardContent>
            {cargando ? (
              <Box
                sx={{
                  minHeight: 280,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <CircularProgress sx={{ color: "#0f766e" }} />
              </Box>
            ) : mascotas.length === 0 ? (
              <EmptyState
                icon={<PetsIcon sx={{ fontSize: 72 }} />}
                title="No hay mascotas registradas"
                description="Cuando registres mascotas, aparecerán en esta sección junto con su dueño, especie y raza."
                actionText={
                  usuarioAdmin && duenos.length > 0 && especies.length > 0
                    ? "Crear primera mascota"
                    : undefined
                }
                onAction={
                  usuarioAdmin && duenos.length > 0 && especies.length > 0
                    ? abrirCrear
                    : undefined
                }
              />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Mascota</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Dueño</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Especie</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Raza</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Sexo</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Edad</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Peso</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Estado</strong>
                      </TableCell>

                      {usuarioAdmin && (
                        <TableCell align="right">
                          <strong>Acciones</strong>
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {mascotas.map((mascota) => (
                      <TableRow key={mascota.id} hover>
                        <TableCell>
                          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                            <Avatar
                              src={mascota.imagen || undefined}
                              alt={`Imagen de ${mascota.nombre}`}
                              sx={{ bgcolor: "#ccfbf1", color: "#0f766e" }}
                            >
                              <PetsIcon />
                            </Avatar>

                            <Box>
                              <Typography sx={{ fontWeight: 800 }}>
                                {mascota.nombre}
                              </Typography>

                              <Typography variant="caption" color="text.secondary">
                                {mascota.color || "Sin color registrado"}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          {mascota.dueno
                            ? `${mascota.dueno.nombre} ${mascota.dueno.apellido}`
                            : "Sin dueño"}
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={mascota.especie?.nombre || "Sin especie"}
                            size="small"
                            sx={{
                              bgcolor: "#ccfbf1",
                              color: "#0f766e",
                              fontWeight: 700
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          {mascota.raza?.nombre || "Sin raza"}
                        </TableCell>

                        <TableCell>{obtenerEtiquetaSexo(mascota.sexo)}</TableCell>

                        <TableCell>
                          {mascota.edad === null || mascota.edad === undefined
                            ? "Sin edad"
                            : `${mascota.edad} años`}
                        </TableCell>

                        <TableCell>
                          {mascota.peso === null || mascota.peso === undefined
                            ? "Sin peso"
                            : `${mascota.peso} kg`}
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={mascota.estado ? "Activo" : "Inactivo"}
                            size="small"
                            sx={{
                              bgcolor: mascota.estado ? "#ccfbf1" : "#fee2e2",
                              color: mascota.estado ? "#0f766e" : "#b91c1c",
                              fontWeight: 700
                            }}
                          />
                        </TableCell>

                        {usuarioAdmin && (
                          <TableCell align="right">
                            <Tooltip title="Editar">
                              <IconButton
                                color="primary"
                                onClick={() => abrirEditar(mascota)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Eliminar">
                              <IconButton
                                color="error"
                                onClick={() =>
                                  abrirConfirmacionEliminar(mascota)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        <MascotaForm
          open={formAbierto}
          loading={guardando}
          mascotaEditar={mascotaEditar}
          duenos={duenos}
          especies={especies}
          razas={razas}
          onClose={cerrarFormulario}
          onSubmit={guardarMascota}
        />

        <ConfirmDialog
          open={confirmAbierto}
          title="Eliminar mascota"
          message={`¿Estás segura de eliminar la mascota "${
            mascotaEliminar?.nombre || ""
          }"?`}
          confirmText="Eliminar"
          loading={eliminando}
          onCancel={cerrarConfirmacionEliminar}
          onConfirm={confirmarEliminar}
        />
      </Box>
    </>
  );
};

export default MascotasPage;