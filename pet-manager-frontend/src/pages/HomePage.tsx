import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Typography
} from "@mui/material";

import Grid from "@mui/material/Grid";
import PetsIcon from "@mui/icons-material/Pets";
import SecurityIcon from "@mui/icons-material/Security";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Pet Manager | Inicio</title>

        <meta
          name="description"
          content="Pet Manager es un sistema web para registrar y administrar mascotas, dueños, especies y razas de forma ordenada y segura."
        />

        <meta
          name="keywords"
          content="Pet Manager, mascotas, dueños, especies, razas, catálogo de mascotas, gestión de mascotas"
        />

        <meta
          name="author"
          content="Vanessa Canaviri Zoto"
        />

        <meta
          property="og:title"
          content="Pet Manager | Sistema de gestión de mascotas"
        />

        <meta
          property="og:description"
          content="Organiza mascotas, dueños, especies y razas en una plataforma web con autenticación JWT y control de roles."
        />

        <meta
          property="og:type"
          content="website"
        />
      </Helmet>

      <Box component="main">
        <Box
          component="section"
          sx={{
            py: { xs: 7, md: 11 },
            background:
              "linear-gradient(135deg, #ecfeff 0%, #f0fdf4 50%, #ffffff 100%)"
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={5} sx={{ alignItems: "center" }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Chip
                  label="Sistema de gestión de mascotas"
                  sx={{
                    mb: 2,
                    bgcolor: "#ccfbf1",
                    color: "#115e59",
                    fontWeight: 600
                  }}
                />

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.4rem", md: "4rem" },
                    color: "#111827",
                    lineHeight: 1.05
                  }}
                >
                  Organiza mascotas, dueños, especies y razas.
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    mt: 3,
                    color: "#4b5563",
                    lineHeight: 1.7
                  }}
                >
                  Pet Manager permite registrar y consultar mascotas de forma
                  ordenada, relacionando cada animal con su dueño, especie y raza
                  correspondiente.
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: 5,
                    p: 4,
                    boxShadow: "0 24px 70px rgba(15, 118, 110, 0.18)",
                    border: "1px solid #d1fae5"
                  }}
                >
                  <Box
                    sx={{
                      height: 280,
                      borderRadius: 4,
                      bgcolor: "#ecfdf5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      px: 4
                    }}
                  >
                    <PetsIcon sx={{ fontSize: 90, color: "#0f766e", mb: 2 }} />

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#111827"
                      }}
                    >
                      Catálogo de mascotas
                    </Typography>

                    <Typography sx={{ mt: 1, color: "#4b5563" }}>
                      Perros, gatos, peces, aves, reptiles y cualquier otra
                      especie registrada en el sistema.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box component="section" sx={{ py: 8, bgcolor: "white" }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                textAlign: "center",
                color: "#111827"
              }}
            >
              Funcionalidades principales
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                mt: 1,
                mb: 5,
                color: "#6b7280"
              }}
            >
              Una plataforma pensada para administrar información de mascotas.
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Card sx={{ height: "100%", borderRadius: 4 }}>
                  <CardContent>
                    <PetsIcon sx={{ color: "#0f766e", fontSize: 36 }} />

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mt: 2
                      }}
                    >
                      Mascotas
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.secondary",
                        mt: 1
                      }}
                    >
                      Registro de animales con edad, sexo, color, peso e imagen.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Card sx={{ height: "100%", borderRadius: 4 }}>
                  <CardContent>
                    <PeopleAltIcon sx={{ color: "#0f766e", fontSize: 36 }} />

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mt: 2
                      }}
                    >
                      Dueños
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.secondary",
                        mt: 1
                      }}
                    >
                      Asociación de cada mascota con su propietario registrado.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Card sx={{ height: "100%", borderRadius: 4 }}>
                  <CardContent>
                    <CategoryIcon sx={{ color: "#0f766e", fontSize: 36 }} />

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mt: 2
                      }}
                    >
                      Especies y razas
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.secondary",
                        mt: 1
                      }}
                    >
                      Catálogo para perros, gatos, peces, aves y más.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Card sx={{ height: "100%", borderRadius: 4 }}>
                  <CardContent>
                    <SecurityIcon sx={{ color: "#0f766e", fontSize: 36 }} />

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mt: 2
                      }}
                    >
                      Seguridad
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.secondary",
                        mt: 1
                      }}
                    >
                      Acceso mediante JWT y acciones restringidas según rol.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;