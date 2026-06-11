import { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import ConfirmDialog from "../components/ConfirmDIalog";
import Header from "../components/Header";
import DuenoForm from "../components/DuenoForm";

import type {
  CrearDuenoRequest,
  Dueno
} from "../interfaces/dueno.interface";

import {
  actualizarDueno,
  crearDueno,
  eliminarDueno,
  obtenerDuenos
} from "../services/dueno.service";

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

const DuenosPage = () => {
  const usuarioAdmin = esAdmin();

  const location = useLocation();
  const navigate = useNavigate();

  const estadoRuta = location.state as { abrirCrear?: boolean } | null;

  const [duenos, setDuenos] = useState<Dueno[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const [formAbierto, setFormAbierto] = useState(false);
  const [duenoEditar, setDuenoEditar] = useState<Dueno | null>(null);

  const [confirmAbierto, setConfirmAbierto] = useState(false);
  const [duenoEliminar, setDuenoEliminar] = useState<Dueno | null>(null);

  const cargarDuenos = async () => {
    try {
      setCargando(true);
      setError("");

      const data = await obtenerDuenos();

      setDuenos(data);
    } catch (error) {
      setError(obtenerMensajeError(error));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDuenos();
  }, []);

  const abrirCrear = () => {
    setDuenoEditar(null);
    setFormAbierto(true);
    setError("");
    setMensajeExito("");
  };

  useEffect(() => {
    if (estadoRuta?.abrirCrear && usuarioAdmin) {
      abrirCrear();

      navigate(location.pathname, {
        replace: true,
        state: {}
      });
    }
  }, [estadoRuta?.abrirCrear, usuarioAdmin, navigate, location.pathname]);

  const abrirEditar = (dueno: Dueno) => {
    setDuenoEditar(dueno);
    setFormAbierto(true);
    setError("");
    setMensajeExito("");
  };

  const cerrarFormulario = () => {
    if (guardando) {
      return;
    }

    setFormAbierto(false);
    setDuenoEditar(null);
  };

  const guardarDueno = async (data: CrearDuenoRequest) => {
    try {
      setGuardando(true);
      setError("");
      setMensajeExito("");

      if (duenoEditar) {
        await actualizarDueno(duenoEditar.id, data);
        setMensajeExito("Dueño actualizado correctamente");
      } else {
        await crearDueno(data);
        setMensajeExito("Dueño creado correctamente");
      }

      setFormAbierto(false);
      setDuenoEditar(null);

      await cargarDuenos();
    } catch (error) {
      setError(obtenerMensajeError(error));
    } finally {
      setGuardando(false);
    }
  };

  const abrirConfirmacionEliminar = (dueno: Dueno) => {
    setDuenoEliminar(dueno);
    setConfirmAbierto(true);
    setError("");
    setMensajeExito("");
  };

  const cerrarConfirmacionEliminar = () => {
    if (eliminando) {
      return;
    }

    setConfirmAbierto(false);
    setDuenoEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!duenoEliminar) {
      return;
    }

    try {
      setEliminando(true);
      setError("");
      setMensajeExito("");

      await eliminarDueno(duenoEliminar.id);

      setMensajeExito("Dueño eliminado correctamente");
      setConfirmAbierto(false);
      setDuenoEliminar(null);

      await cargarDuenos();
    } catch (error) {
      setError(obtenerMensajeError(error));
    } finally {
      setEliminando(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Pet Manager | Dueños</title>

        <meta
          name="description"
          content="Administra los dueños registrados en Pet Manager y relaciona cada propietario con sus mascotas dentro del sistema."
        />

        <meta
          name="keywords"
          content="Pet Manager, dueños, propietarios, mascotas, gestión de dueños, sistema de mascotas"
        />

        <meta
          name="author"
          content="Pet Manager"
        />

        <meta
          property="og:title"
          content="Pet Manager | Gestión de dueños"
        />

        <meta
          property="og:description"
          content="Gestiona los propietarios registrados y consulta su información de contacto dentro del sistema Pet Manager."
        />

        <meta
          property="og:type"
          content="website"
        />
      </Helmet>
      
      <Box>
        <Header
          title="Dueños"
          subtitle="Administra los propietarios asociados a las mascotas registradas."
          action={
            usuarioAdmin ? (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={abrirCrear}
                sx={{
                  bgcolor: "#0f766e",
                  "&:hover": {
                    bgcolor: "#115e59"
                  }
                }}
              >
                Nuevo dueño
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
              eliminar dueños.
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
            ) : duenos.length === 0 ? (
              <Box
                sx={{
                  minHeight: 260,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                  px: 2
                }}
              >
                <PeopleAltIcon sx={{ fontSize: 70, color: "#0f766e", mb: 2 }} />

                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  No hay dueños registrados
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Cuando registres propietarios de mascotas, aparecerán en esta
                  sección.
                </Typography>

                {usuarioAdmin && (
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={abrirCrear}
                    sx={{
                      mt: 3,
                      bgcolor: "#0f766e",
                      "&:hover": {
                        bgcolor: "#115e59"
                      }
                    }}
                  >
                    Crear primer dueño
                  </Button>
                )}
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Nombre completo</strong>
                      </TableCell>
                      <TableCell>
                        <strong>CI</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Teléfono</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Email</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Dirección</strong>
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
                    {duenos.map((dueno) => (
                      <TableRow key={dueno.id} hover>

                        <TableCell>
                          <Typography sx={{ fontWeight: 700 }}>
                            {dueno.nombre} {dueno.apellido}
                          </Typography>
                        </TableCell>

                        <TableCell>{dueno.ci}</TableCell>

                        <TableCell>{dueno.telefono|| "Sin teléfono"}</TableCell>

                        <TableCell>{dueno.email || "Sin email"}</TableCell>

                        <TableCell>
                          {dueno.direccion || "Sin dirección"}
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={dueno.estado ? "Activo" : "Inactivo"}
                            size="small"
                            sx={{
                              bgcolor: dueno.estado ? "#ccfbf1" : "#fee2e2",
                              color: dueno.estado ? "#0f766e" : "#b91c1c",
                              fontWeight: 700
                            }}
                          />
                        </TableCell>

                        {usuarioAdmin && (
                          <TableCell align="right">
                            <Tooltip title="Editar">
                              <IconButton
                                color="primary"
                                onClick={() => abrirEditar(dueno)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Eliminar">
                              <IconButton
                                color="error"
                                onClick={() =>
                                  abrirConfirmacionEliminar(dueno)
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

        <DuenoForm
          open={formAbierto}
          loading={guardando}
          duenoEditar={duenoEditar}
          onClose={cerrarFormulario}
          onSubmit={guardarDueno}
        />

        <ConfirmDialog
          open={confirmAbierto}
          title="Eliminar dueño"
          message={`¿Estás segura de eliminar al dueño "${
            duenoEliminar
              ? `${duenoEliminar.nombre} ${duenoEliminar.apellido}`
              : ""
          }"? Esta acción solo se permitirá si no tiene mascotas asociadas.`}
          confirmText="Eliminar"
          loading={eliminando}
          onCancel={cerrarConfirmacionEliminar}
          onConfirm={confirmarEliminar}
        />
      </Box>
    </>
  );
};

export default DuenosPage;