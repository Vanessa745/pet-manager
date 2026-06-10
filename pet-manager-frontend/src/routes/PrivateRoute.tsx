import { Navigate, Outlet } from "react-router-dom";
import { estaAutenticado } from "../services/auth.service";

const PrivateRoute = () => {
  if (!estaAutenticado()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;