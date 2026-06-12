import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { estaAutenticado } from "../services/auth.service";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const autenticado = estaAutenticado();

  return (
    <>
      <Helmet>
        <title>Pet Manager | Página no encontrada</title>

        <meta
          name="description"
          content="La página solicitada no existe dentro de Pet Manager."
        />

        <meta
          name="keywords"
          content="Pet Manager, mascotas, página no encontrada, 404, gestión de mascotas"
        />

        <meta
          name="author"
          content="Vanessa Canaviri Zoto"
        />

        <meta 
          property="og:title" 
          content="Pet Manager | Página no encontrada" 
        />

        <meta
          property="og:description"
          content="La ruta solicitada no fue encontrada en el sistema Pet Manager."
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
        <Container maxWidth="md">
          <Card
            sx={{
              borderRadius: 5,
              border: "1px solid #d1fae5",
              boxShadow: "0 24px 70px rgba(15, 118, 110, 0.18)"
            }}
          >
            <CardContent
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: "center"
              }}
            >
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  bgcolor: "#ccfbf1",
                  color: "#0f766e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3
                }}
              >
                <SearchOffIcon sx={{ fontSize: 52 }} />
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "4rem", md: "6rem" },
                  fontWeight: 900,
                  color: "#0f766e",
                  lineHeight: 1
                }}
              >
                404
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#111827",
                  mt: 2
                }}
              >
                Página no encontrada
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 2,
                  maxWidth: 560,
                  mx: "auto",
                  lineHeight: 1.7
                }}
              >
                La ruta que intentaste visitar no existe o fue movida. Puedes
                volver al inicio público o regresar al panel principal si ya
                iniciaste sesión.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  justifyContent: "center",
                  mt: 4 
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<HomeIcon />}
                  onClick={() => navigate("/")}
                  sx={{
                    borderColor: "#0f766e",
                    color: "#0f766e",
                    px: 3,
                    py: 1.2,
                    fontWeight: 700
                  }}
                >
                  Ir al inicio
                </Button>

                {autenticado && (
                  <Button
                    variant="contained"
                    startIcon={<DashboardIcon />}
                    onClick={() => navigate("/dashboard")}
                    sx={{
                      bgcolor: "#0f766e",
                      px: 3,
                      py: 1.2,
                      fontWeight: 700,
                      "&:hover": {
                        bgcolor: "#115e59"
                      }
                    }}
                  >
                    Ir al dashboard
                  </Button>
                )}
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 5,
                  color: "#0f766e"
                }}
              >
                <PetsIcon />
                <Typography sx={{ fontWeight: 800 }}>Pet Manager</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default NotFoundPage;