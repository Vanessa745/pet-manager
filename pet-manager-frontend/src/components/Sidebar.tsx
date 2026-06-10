import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";

import { logout, obtenerUsuario } from "../services/auth.service";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = obtenerUsuario();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard"
    },
    {
      text: "Mascotas",
      icon: <PetsIcon />,
      path: "/mascotas"
    },
    {
      text: "Dueños",
      icon: <PeopleAltIcon />,
      path: "/duenos"
    },
    {
      text: "Especies",
      icon: <CategoryIcon />,
      path: "/especies"
    },
    {
      text: "Razas",
      icon: <AccountTreeIcon />,
      path: "/razas"
    }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);

    if (onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PetsIcon sx={{ color: "#0f766e" }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Pet Manager
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Sesión iniciada como
        </Typography>

        <Typography sx={{ fontWeight: 700 }} noWrap>
          {usuario?.nombre || "Usuario"}
        </Typography>

        <Typography variant="caption" sx={{ color: "#0f766e", fontWeight: 700 }}>
          {usuario?.rol || "USER"}
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1, px: 1 }}>
        {menuItems.map((item) => {
          const selected = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              selected={selected}
              onClick={() => handleNavigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                "&.Mui-selected": {
                  bgcolor: "#ccfbf1",
                  color: "#0f766e"
                },
                "&.Mui-selected:hover": {
                  bgcolor: "#99f6e4"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: selected ? "#0f766e" : "inherit",
                  minWidth: 40
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          );
        })}
      </List>

      <Divider />

      <List sx={{ px: 1, pb: 2 }}>
        <ListItemButton
          onClick={() => handleNavigate("/")}
          sx={{ borderRadius: 2, mb: 0.5 }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio público" />
        </ListItemButton>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: "#dc2626"
          }}
        >
          <ListItemIcon sx={{ color: "#dc2626", minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;