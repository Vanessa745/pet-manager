import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth.service";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const validarFormulario = () => {
    if (!email.trim()) {
      setError("El email es obligatorio");
      return false;
    }

    if (!email.includes("@")) {
      setError("El email no tiene un formato válido");
      return false;
    }

    if (!password.trim()) {
      setError("La contraseña es obligatoria");
      return false;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!validarFormulario()) {
      return;
    }

    try {
      setCargando(true);

      await login({
        email,
        password
      });

      navigate("/dashboard");
    } catch (error: any) {
      const mensaje =
        error.response?.data?.message ||
        "No se pudo iniciar sesión. Verifica tus credenciales.";

      setError(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Pet Manager | Iniciar sesión</title>

        <meta
          name="description"
          content="Inicia sesión en Pet Manager para acceder al sistema de gestión de mascotas, dueños, especies y razas."
        />

        <meta
          name="keywords"
          content="Pet Manager, login, iniciar sesión, gestión de mascotas, JWT, sistema de mascotas"
        />

        <meta
          name="author"
          content="Pet Manager"
        />

        <meta
          property="og:title"
          content="Pet Manager | Iniciar sesión"
        />

        <meta
          property="og:description"
          content="Accede a Pet Manager para administrar mascotas, dueños, especies y razas mediante un sistema protegido con JWT."
        />

        <meta
          property="og:type"
          content="website"
        />
      </Helmet>
      
      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 65px)",
          display: "flex",
          alignItems: "center",
          py: 6,
          background:
            "linear-gradient(135deg, #ecfeff 0%, #f0fdf4 50%, #ffffff 100%)"
        }}
      >
        <Container maxWidth="sm">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              mb: 3,
              color: "#0f766e",
              textTransform: "none",
              fontWeight: 600
            }}
          >
            Volver al inicio
          </Button>

          <Card
            sx={{
              borderRadius: 5,
              boxShadow: "0 24px 70px rgba(15, 118, 110, 0.18)",
              border: "1px solid #d1fae5"
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              <Stack sx={{ alignItems: "center", mb: 4}} spacing={1.5}>
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    bgcolor: "#ccfbf1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <PetsIcon sx={{ fontSize: 42, color: "#0f766e" }} />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#111827",
                    textAlign: "center"
                  }}
                >
                  Iniciar sesión
                </Typography>

                <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
                  Accede a Pet Manager para gestionar mascotas, dueños, especies y
                  razas.
                </Typography>
              </Stack>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                  />

                  <TextField
                    label="Contraseña"
                    type={mostrarPassword ? "text" : "password"}
                    fullWidth
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                    slotProps={{
                      input: {
                        endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Mostrar u ocultar contraseña"
                            onClick={() => setMostrarPassword(!mostrarPassword)}
                            edge="end"
                          >
                            {mostrarPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                        )
                      }
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={cargando}
                    startIcon={<LoginIcon />}
                    sx={{
                      bgcolor: "#0f766e",
                      py: 1.4,
                      fontWeight: 700,
                      "&:hover": {
                        bgcolor: "#115e59"
                      }
                    }}
                  >
                    {cargando ? "Ingresando..." : "Ingresar"}
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;