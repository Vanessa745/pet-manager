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
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import ConfirmDialog from "../components/ConfirmDialog";
import Header from "../components/Header";
import RazaForm from "../components/RazaForm";

import type { Especie } from "../interfaces/especie.interface";
import type { CrearRazaRequest, Raza } from "../interfaces/raza.interface";

import { obtenerEspecies } from "../services/especie.service";
import {
  actualizarRaza,
  crearRaza,
  eliminarRaza,
  obtenerRazas
} from "../services/raza.service";

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

const RazasPage = () => {
  const usuarioAdmin = esAdmin();

  const [razas, setRazas] = useState<Raza[]>([]);
  const [especies, setEspecies] = useState<Especie[]>([]);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const [formAbierto, setFormAbierto] = useState(false);
  const [razaEditar, setRazaEditar] = useState<Raza | null>(null);

  const [confirmAbierto, setConfirmAbierto] = useState(false);
  const [razaEliminar, setRazaEliminar] = useState<Raza | null>(null);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError("");

      const [razasData, especiesData] = await Promise.all([
        obtenerRazas(),
        obtenerEspecies()
      ]);

      setRazas(razasData);
      setEspecies(especiesData);
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
    setRazaEditar(null);
    setFormAbierto(true);
    setError("");
    setMensajeExito("");
  };

  const abrirEditar = (raza: Raza) => {
    setRazaEditar(raza);
    setFormAbierto(true);
    setError("");
    setMensajeExito("");
  };

  const cerrarFormulario = () => {
    if (guardando) {
      return;
    }

    setFormAbierto(false);
    setRazaEditar(null);
  };

  const guardarRaza = async (data: CrearRazaRequest) => {
    try {
      setGuardando(true);
      setError("");
      setMensajeExito("");

      if (razaEditar) {
        await actualizarRaza(razaEditar.id, data);
        setMensajeExito("Raza actualizada correctamente");
      } else {
        await crearRaza(data);
        setMensajeExito("Raza creada correctamente");
      }

      setFormAbierto(false);
      setRazaEditar(null);

      await cargarDatos();
    } catch (error) {
      setError(obtenerMensajeError(error));
    } finally {
      setGuardando(false);
    }
  };

  const abrirConfirmacionEliminar = (raza: Raza) => {
    setRazaEliminar(raza);
    setConfirmAbierto(true);
    setError("");
    setMensajeExito("");
  };

  const cerrarConfirmacionEliminar = () => {
    if (eliminando) {
      return;
    }

    setConfirmAbierto(false);
    setRazaEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!razaEliminar) {
      return;
    }

    try {
      setEliminando(true);
      setError("");
      setMensajeExito("");

      await eliminarRaza(razaEliminar.id);

      setMensajeExito("Raza eliminada correctamente");
      setConfirmAbierto(false);
      setRazaEliminar(null);

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
        <title>Pet Manager | Razas</title>

        <meta
          name="description"
          content="Administra las razas y variedades de mascotas en Pet Manager, relacionando cada raza con su especie correspondiente."
        />

        <meta
          name="keywords"
          content="Pet Manager, razas, especies, mascotas, razas de perros, razas de gatos, catálogo de razas"
        />

        <meta
          name="author"
          content="Pet Manager"
        />

        <meta
          property="og:title"
          content="Pet Manager | Gestión de razas"
        />

        <meta
          property="og:description"
          content="Gestiona razas o variedades de mascotas y relaciónalas correctamente con especies dentro del sistema Pet Manager."
        />

        <meta
          property="og:type"
          content="website"
        />
      </Helmet>
      
      <Box>
        <Header
          title="Razas"
          subtitle="Administra las razas o variedades relacionadas con cada especie."
          action={
            usuarioAdmin ? (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={abrirCrear}
                disabled={especies.length === 0}
                sx={{
                  bgcolor: "#0f766e",
                  "&:hover": {
                    bgcolor: "#115e59"
                  }
                }}
              >
                Nueva raza
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
              eliminar razas.
            </Alert>
          )}

          {usuarioAdmin && especies.length === 0 && !cargando && (
            <Alert severity="warning">
              Primero debes registrar al menos una especie antes de crear razas.
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
            ) : razas.length === 0 ? (
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
                <AccountTreeIcon
                  sx={{ fontSize: 70, color: "#0f766e", mb: 2 }}
                />

                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  No hay razas registradas
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Cuando registres razas o variedades, aparecerán en esta sección.
                </Typography>

                {usuarioAdmin && especies.length > 0 && (
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
                    Crear primera raza
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
                        <strong>Especie</strong>
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
                    {razas.map((raza) => (
                      <TableRow key={raza.id} hover>

                        <TableCell>
                          <Typography sx={{ fontWeight: 700 }}>{raza.nombre}</Typography>
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={raza.especie?.nombre || "Sin especie"}
                            size="small"
                            sx={{
                              bgcolor: "#ccfbf1",
                              color: "#0f766e",
                              fontWeight: 700
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          {raza.descripcion || "Sin descripción"}
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={raza.estado ? "Activo" : "Inactivo"}
                            size="small"
                            sx={{
                              bgcolor: raza.estado ? "#ccfbf1" : "#fee2e2",
                              color: raza.estado ? "#0f766e" : "#b91c1c",
                              fontWeight: 700
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          {new Date(raza.fechaRegistro).toLocaleDateString()}
                        </TableCell>

                        {usuarioAdmin && (
                          <TableCell align="right">
                            <Tooltip title="Editar">
                              <IconButton
                                color="primary"
                                onClick={() => abrirEditar(raza)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Eliminar">
                              <IconButton
                                color="error"
                                onClick={() =>
                                  abrirConfirmacionEliminar(raza)
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

        <RazaForm
          open={formAbierto}
          loading={guardando}
          razaEditar={razaEditar}
          especies={especies}
          onClose={cerrarFormulario}
          onSubmit={guardarRaza}
        />

        <ConfirmDialog
          open={confirmAbierto}
          title="Eliminar raza"
          message={`¿Estás segura de eliminar la raza "${
            razaEliminar?.nombre || ""
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

export default RazasPage;