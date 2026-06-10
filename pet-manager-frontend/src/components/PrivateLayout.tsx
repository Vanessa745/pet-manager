import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import { obtenerUsuario } from "../services/auth.service";

const drawerWidth = 260;

const PrivateLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const usuario = obtenerUsuario();

  const handleToggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "#111827",
          borderBottom: "1px solid #e5e7eb",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` }
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton onClick={handleToggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}

            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Panel de administración
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {usuario?.nombre || "Usuario"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {usuario?.rol || "USER"}
              </Typography>
            </Box>

            <Avatar sx={{ bgcolor: "#0f766e" }}>
              <PetsIcon />
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 }
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleToggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box"
            }
          }}
        >
          <Sidebar onClose={handleToggleDrawer} />
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid #e5e7eb"
            }
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          pt: 10,
          pb: 5
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default PrivateLayout;