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
import CategoryIcon from "@mui/icons-material/Category";

import ConfirmDialog from "../components/ConfirmDIalog";
import EspecieForm from "../components/EspecieForm";
import Header from "../components/Header";

import {
  actualizarEspecie,
  crearEspecie,
  eliminarEspecie,
  obtenerEspecies
} from "../services/especie.service";

import type {
  CrearEspecieRequest,
  Especie
} from "../interfaces/especie.interface";

import { esAdmin } from "../services/auth.service";
import { Helmet } from "react-helmet-async";

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

const EspeciesPage = () => {
  const usuarioAdmin = esAdmin();

  const [especies, setEspecies] = useState<Especie[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const [formAbierto, setFormAbierto] = useState(false);
  const [especieEditar, setEspecieEditar] = useState<Especie | null>(null);

  const [confirmAbierto, setConfirmAbierto] = useState(false);
  const [especieEliminar, setEspecieEliminar] = useState<Especie | null>(null);

  const cargarEspecies = async () => {
    try {
      setCargando(true);
      setError("");

      const data = await obtenerEspecies();

      setEspecies(data);
    } catch (error) {
      setError(obtenerMensajeError(error));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEspecies();
  }, []);

  const abrirCrear = () => {
    setEspecieEditar(null);
    setFormAbierto(true);
    setError("");
    setMensajeExito("");
  };

  const abrirEditar = (especie: Especie) => {
    setEspecieEditar(especie);
    setFormAbierto(true);
    setError("");
    setMensajeExito("");
  };

  const cerrarFormulario = () => {
    if (guardando) {
      return;
    }

    setFormAbierto(false);
    setEspecieEditar(null);
  };

  const guardarEspecie = async (data: CrearEspecieRequest) => {
    try {
      setGuardando(true);
      setError("");
      setMensajeExito("");

      if (especieEditar) {
        await actualizarEspecie(especieEditar.id, data);
        setMensajeExito("Especie actualizada correctamente");
      } else {
        await crearEspecie(data);
        setMensajeExito("Especie creada correctamente");
      }

      setFormAbierto(false);
      setEspecieEditar(null);

      await cargarEspecies();
    } catch (error) {
      setError(obtenerMensajeError(error));
    } finally {
      setGuardando(false);
    }
  };

  const abrirConfirmacionEliminar = (especie: Especie) => {
    setEspecieEliminar(especie);
    setConfirmAbierto(true);
    setError("");
    setMensajeExito("");
  };

  const cerrarConfirmacionEliminar = () => {
    if (eliminando) {
      return;
    }

    setConfirmAbierto(false);
    setEspecieEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!especieEliminar) {
      return;
    }

    try {
      setEliminando(true);
      setError("");
      setMensajeExito("");

      await eliminarEspecie(especieEliminar.id);

      setMensajeExito("Especie eliminada correctamente");
      setConfirmAbierto(false);
      setEspecieEliminar(null);

      await cargarEspecies();
    } catch (error) {
      setError(obtenerMensajeError(error));
    } finally {
      setEliminando(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Pet Manager | Especies</title>

        <meta
          name="description"
          content="Administra el catálogo de especies de Pet Manager, registrando tipos de mascotas como perros, gatos, aves, peces y reptiles."
        />

        <meta
          name="keywords"
          content="Pet Manager, especies, catálogo de especies, mascotas, perros, gatos, aves, peces, reptiles"
        />

        <meta
          name="author"
          content="Pet Manager"
        />

        <meta
          property="og:title"
          content="Pet Manager | Gestión de especies"
        />

        <meta
          property="og:description"
          content="Gestiona las especies disponibles en el sistema Pet Manager para organizar correctamente las mascotas registradas."
        />

        <meta
          property="og:type"
          content="website"
        />
      </Helmet>

      <Box>
        <Header
          title="Especies"
          subtitle="Administra el catálogo general de especies disponibles en el sistema."
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
                Nueva especie
              </Button>
            ) : (
              <Chip
                label="Solo visualización"
                color="info"
                variant="outlined"
              />
            )
          }
        />

        <Stack spacing={2} sx={{ mb: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}
          {mensajeExito && <Alert severity="success">{mensajeExito}</Alert>}

          {!usuarioAdmin && (
            <Alert severity="info">
              Tu rol actual permite visualizar registros, pero no crear, editar ni
              eliminar especies.
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
            ) : especies.length === 0 ? (
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
                <CategoryIcon sx={{ fontSize: 70, color: "#0f766e", mb: 2 }} />

                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  No hay especies registradas
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Cuando registres especies como perro, gato, pez o ave,
                  aparecerán en esta sección.
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
                    Crear primera especie
                  </Button>
                )}
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Nombre</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Descripción</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Estado</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Fecha de registro</strong>
                      </TableCell>

                      {usuarioAdmin && (
                        <TableCell align="right">
                          <strong>Acciones</strong>
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {especies.map((especie) => (
                      <TableRow key={especie.id} hover>
                        <TableCell>
                          <Typography sx={{ fontWeight: 700 }}>
                            {especie.nombre}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          {especie.descripcion || "Sin descripción"}
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={especie.estado ? "Activo" : "Inactivo"}
                            size="small"
                            sx={{
                              bgcolor: especie.estado ? "#ccfbf1" : "#fee2e2",
                              color: especie.estado ? "#0f766e" : "#b91c1c",
                              fontWeight: 700
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          {new Date(especie.fechaRegistro).toLocaleDateString()}
                        </TableCell>

                        {usuarioAdmin && (
                          <TableCell align="right">
                            <Tooltip title="Editar">
                              <IconButton
                                color="primary"
                                onClick={() => abrirEditar(especie)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Eliminar">
                              <IconButton
                                color="error"
                                onClick={() =>
                                  abrirConfirmacionEliminar(especie)
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

        <EspecieForm
          open={formAbierto}
          loading={guardando}
          especieEditar={especieEditar}
          onClose={cerrarFormulario}
          onSubmit={guardarEspecie}
        />

        <ConfirmDialog
          open={confirmAbierto}
          title="Eliminar especie"
          message={`¿Estás segura de eliminar la especie "${
            especieEliminar?.nombre || ""
          }"? Esta acción solo se permitirá si no tiene razas o mascotas asociadas.`}
          confirmText="Eliminar"
          loading={eliminando}
          onCancel={cerrarConfirmacionEliminar}
          onConfirm={confirmarEliminar}
        />
      </Box>
    </>
  );
};

export default EspeciesPage;