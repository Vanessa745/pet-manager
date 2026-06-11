import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";
import { esAdmin, obtenerUsuario } from "../services/auth.service";
import { Helmet } from "react-helmet-async";

const DashboardPage = () => {
  const navigate = useNavigate();
  const usuario = obtenerUsuario();
  const usuarioAdmin = esAdmin();

  return (
    <>
      <Helmet>
        <title>Pet Manager | Dashboard</title>

        <meta
          name="description"
          content="Panel principal de Pet Manager para gestionar mascotas, dueños, especies y razas desde una interfaz protegida por autenticación JWT."
        />

        <meta
          name="keywords"
          content="Pet Manager, dashboard, panel de administración, mascotas, dueños, especies, razas, JWT, roles"
        />

        <meta
          name="author"
          content="Pet Manager"
        />

        <meta
          property="og:title"
          content="Pet Manager | Dashboard"
        />

        <meta
          property="og:description"
          content="Accede al panel principal de Pet Manager para administrar mascotas, dueños, especies y razas según tu rol de usuario."
        />

        <meta
          property="og:type"
          content="website"
        />
      </Helmet>
      
      <Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 4
          }}
          spacing={2}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }} color="#111827">
              Bienvenida, {usuario?.nombre || "Usuario"}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Este es tu panel principal para gestionar mascotas, dueños, especies
              y razas.
            </Typography>
          </Box>

          <Chip
            label={`Rol: ${usuario?.rol || "USER"}`}
            sx={{
              bgcolor: usuarioAdmin ? "#ccfbf1" : "#e0f2fe",
              color: usuarioAdmin ? "#0f766e" : "#0369a1",
              fontWeight: 700
            }}
          />
        </Stack>

        {!usuarioAdmin && (
          <Alert severity="info" sx={{ mb: 4 }}>
            Tu rol actual es USER. Puedes visualizar registros, pero no crear,
            editar ni eliminar información.
          </Alert>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)"
            },
            gap: 3,
            mb: 4
          }}
        >
          <StatCard
            title="Mascotas"
            value="CRUD"
            description="Registro principal de animales del sistema."
            icon={<PetsIcon />}
          />

          <StatCard
            title="Dueños"
            value="Gestión"
            description="Propietarios asociados a una o varias mascotas."
            icon={<PeopleAltIcon />}
          />

          <StatCard
            title="Especies"
            value="Catálogo"
            description="Tipos generales como perro, gato, pez o ave."
            icon={<CategoryIcon />}
          />

          <StatCard
            title="Razas"
            value="Relación"
            description="Razas o variedades relacionadas con especies."
            icon={<AccountTreeIcon />}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr"
            },
            gap: 3
          }}
        >
          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid #e5e7eb",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)"
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }} color="#111827">
                Módulos principales
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                Accede rápidamente a las secciones del sistema.
              </Typography>

              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate("/mascotas")}
                  sx={{
                    justifyContent: "flex-start",
                    borderColor: "#0f766e",
                    color: "#0f766e",
                    py: 1.2
                  }}
                >
                  Ver mascotas registradas
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate("/duenos")}
                  sx={{
                    justifyContent: "flex-start",
                    borderColor: "#0f766e",
                    color: "#0f766e",
                    py: 1.2
                  }}
                >
                  Ver dueños registrados
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate("/especies")}
                  sx={{
                    justifyContent: "flex-start",
                    borderColor: "#0f766e",
                    color: "#0f766e",
                    py: 1.2
                  }}
                >
                  Ver especies y razas
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "#0f766e",
              color: "white",
              boxShadow: "0 12px 30px rgba(15, 118, 110, 0.25)"
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Acciones rápidas
              </Typography>

              <Typography sx={{ mt: 1, opacity: 0.9 }}>
                Las acciones de creación están disponibles solo para
                administradores.
              </Typography>

              <Stack spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  disabled={!usuarioAdmin}
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/mascotas", { state: { abrirCrear: true } })}
                  sx={{
                    bgcolor: "white",
                    color: "#0f766e",
                    fontWeight: 700,
                    "&:hover": {
                      bgcolor: "#f0fdf4"
                    }
                  }}
                >
                  Nueva mascota
                </Button>

                <Button
                  variant="outlined"
                  disabled={!usuarioAdmin}
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/duenos", { state: { abrirCrear: true } })}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    fontWeight: 700,
                    "&.Mui-disabled": {
                      borderColor: "rgba(255,255,255,0.35)",
                      color: "rgba(255,255,255,0.45)"
                    }
                  }}
                >
                  Nuevo dueño
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default DashboardPage;