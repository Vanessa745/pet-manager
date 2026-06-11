import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { Outlet, useNavigate } from "react-router-dom";

const PublicLayout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "#1f2937",
          borderBottom: "1px solid #e5e7eb"
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer"
              }}
              onClick={() => navigate("/")}
            >
              <PetsIcon sx={{ color: "#0f766e" }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Pet Manager
              </Typography>
            </Box>
              
            <Box sx={{ display: "flex", gap: 1 }}>
              {token ? (
                <Button
                  variant="contained"
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    bgcolor: "#0f766e",
                    "&:hover": {
                      bgcolor: "#115e59"
                    }
                  }}
                >
                  Ir al dashboard
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    bgcolor: "#0f766e",
                    "&:hover": {
                      bgcolor: "#115e59"
                    }
                  }}
                >
                  Iniciar sesión
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </Box>
  );
};

export default PublicLayout;